import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { forIn, startsWith } from 'lodash';

@Injectable()
export class HttpCacheService {
  
  static ttl = 5;

  static setTTL(value: number) {
    HttpCacheService.ttl = value;
  }

  constructor(private storage: LocalStorageService) {
    this.storage.setItems$.subscribe(s => console.log(s));
  }

  invalidate() {
    forIn(window.localStorage, (value: string, object: string) => {
      if (true === startsWith(object, 'bb.req-')) {
        window.localStorage.removeItem(object)
      }
    });
  }

  get(req: HttpRequest<any>) {
    let record: any | null = null
    const keyHash = 'req-' + Md5.hashStr(req.urlWithParams).toString();
    record = this.storage.get(keyHash)

    if (!record) {
      return false;
    }

	  if (new Date().getTime() < record.timestamp) {
      return record.value;
    } else {
      this.storage.remove(keyHash);
      return false;
    }
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>) {
    const keyHash = 'req-' + Md5.hashStr(req.urlWithParams).toString();
    const expires = HttpCacheService.ttl * 60 * 1000;
    const timestamp = new Date().getTime() + expires
    const record = { value: response.body, timestamp: timestamp }

    this.storage.set(keyHash, record);
  }
}
