import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppComponent } from './core/containers/app/app.component';
import { CoreModule } from './core/core.module';
import { removeNgStyles, createInputTransfer } from '@angularclass/hmr';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@NgModule({
  imports: [BrowserModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, private _store: Store<any>) {}
  createNewHosts(cmps) {
    const components = Array.prototype.map.call(cmps, function(componentNode) {
      const newNode = document.createElement(componentNode.tagName);
      const currentDisplay = newNode.style.display;
      newNode.style.display = 'none';
      if (!!componentNode.parentNode) {
        const parentNode = componentNode.parentNode;
        parentNode.insertBefore(newNode, componentNode);
        return function removeOldHost() {
          newNode.style.display = currentDisplay;
          try {
            parentNode.removeChild(componentNode);
          } catch (e) {}
        };
      } else {
        return function() {}; // make it callable
      }
    });
    return function removeOldHosts() {
      components.forEach(function(removeOldHost) {
        return removeOldHost();
      });
    };
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(
      cmp => cmp.location.nativeElement
    );
    this._store.pipe(take(1)).subscribe(s => (store.rootState = s));
    store.disposeOldHosts = this.createNewHosts(cmpLocation);
    store.restoreInputValues = createInputTransfer();
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
  hmrOnInit(store) {
    if (!store || !store.rootState) {
      return;
    }
    // restore state by dispatch a SET_ROOT_STATE action
    if (store.rootState) {
      this._store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.rootState
      });
    }
    if ('restoreInputValues' in store) {
      store.restoreInputValues();
    }
    //this.appRef.tick();  <<< REMOVE THIS LINE, or store will not work after HMR
    Object.keys(store).forEach(prop => delete store[prop]);
  }
}
