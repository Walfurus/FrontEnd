import {
  FirestoreWrapper,
  FirebaseClient,
  FirebaseClientStateObject,
  ICollectionQueryBuilder,
  IDocumentQueryBuilder,
} from 'firecache';
import { Observable } from 'rxjs';
import { map, filter, take, switchMap } from 'rxjs/operators';

type HistoryItem = any;
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/storage';
import _ from 'lodash';

import { PLATFORM_ID, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RouteStateObject, CollectionPaths, DocumentPaths } from '../shared/firestore-routes';

export type RootStateObject = RouteStateObject & FirebaseClientStateObject;

@Injectable({ providedIn: 'root' })
class FireStateFacade {
  private static _app: FirebaseClient<
    CollectionPaths,
    DocumentPaths,
    RootStateObject
  >;
  private static _db: FirestoreWrapper<
    CollectionPaths,
    DocumentPaths,
    RootStateObject
  >;

  public CollectionPaths = CollectionPaths;
  public DocumentPaths = DocumentPaths;

  public get db(): FirestoreWrapper<
    CollectionPaths,
    DocumentPaths,
    RootStateObject
  > {
    return FireStateFacade._db;
  }
  public get app(): FirebaseClient<
    CollectionPaths,
    DocumentPaths,
    RootStateObject
  > {
    return FireStateFacade._app;
  }

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    const isInitialized = FireStateFacade._app;
    if (isInitialized) {
      return;
    }
    let firebaseConfig: any;
      firebaseConfig = environment.firebase

    FireStateFacade._app = new FirebaseClient(firebaseConfig, {
      logLevel: 1,
      convertTimestamps: true,
    });
    FireStateFacade._db = this.app.db;
    this.UserId$().subscribe((userId) => {
      FireStateFacade._app.PatchRootState({ userId: userId });
    });
  }

  public FromCollection(
    collectionTemplateKey: CollectionPaths,
    logging?: 'LOGGING'
  ): ICollectionQueryBuilder<RootStateObject, CollectionPaths, DocumentPaths> {
    return this.db.FromCollection(collectionTemplateKey);
  }

  public FromDocument(
    documentTemplateKey: DocumentPaths,
    logging?: 'LOGGING'
  ): IDocumentQueryBuilder<RootStateObject, CollectionPaths, DocumentPaths> {
    return this.db.FromDocument(documentTemplateKey);
  }

  PatchRootState(rootState: RootStateObject) {
    console.log('FireStateFacade: PatchRootState()', { rootState });
    this.app.PatchRootState(rootState as any);
  }

  IsLoggedIn(): Promise<boolean> {
    return this.app.$IsLoggedIn().pipe(take(1)).toPromise();
  }
  State$(): Observable<RootStateObject> {
    return this.app.$GetRootState();
  }
  UserId$(): Observable<string> {
    return this.app.$CurrentUser().pipe(
      filter((e) => !!e && !!e.uid),
      map((e) => e.uid)
    );
  }

  UserId(): Promise<string> {
    return this.UserId$().pipe(take(1)).toPromise();
  }
  UserObj(): Promise<firebase.User | undefined> {
    return this.State$()
      .pipe(
        take(1),
        map((s) => s.user)
      )
      .toPromise();
  }

  async GetIdToken(): Promise<string> {
    const u = await this.app.$CurrentUser().pipe(take(1)).toPromise();
    const idToken = await u.getIdToken();
    return idToken;
  }
  httpsCallable(str: string): firebase.functions.HttpsCallable {
    return this.app.appSDK.functions().httpsCallable(str);
  }

  public async UpdateWithHistory<T>(
    collectionTemplateKey: CollectionPaths,
    id: string,
    obj: T,
    text?: string
  ): Promise<any> {
    const docBefore = await this.db
      .FromCollection(collectionTemplateKey)
      .GetId<T>(id)
      .pipe(take(1))
      .toPromise();
    const docAfter = obj;
    await Promise.all([
      this.addHistory(collectionTemplateKey, id, {
        text: text || 'Item changed',
        change_type: 'edited',
        doc_old: tryGetJson(docBefore),
        doc_new: tryGetJson(docAfter),
      }),
      this.db.FromCollection(collectionTemplateKey).Update<T>(id, obj),
    ]).catch((e) => console.error(e));
  }

  private async addHistory(
    collectionTemplateKey: CollectionPaths,
    id: string,
    changeDetail: HistoryItem
  ) {
    const u = await this.UserObj();
    if(!u) {
      return;
    }
    changeDetail.created_at = new Date();
    changeDetail.created_by_id = u.uid;
    changeDetail.created_by_email = u.email;
    await this.db
      .FromCollection(collectionTemplateKey)
      .ref()
      .pipe(
        switchMap((ref) => ref.doc(id).collection('history').add(changeDetail)),
        take(1)
      )
      .toPromise();
  }
}

function tryGetJson(doc: any) {
  try {
    const json = JSON.stringify(doc);
    return json;
  } catch (error) {
    console.warn('error getting JSON.stringify() from ', { doc });
    throw error;
  }
}

export { FireStateFacade };
