import {Injectable}                                                                     from "@angular/core";
import { NavParams, NavController, LoadingController, MenuController, Platform, AlertController, ActionSheetController, ModalController, PopoverController, ToastController }        from '@ionic/angular/standalone';
import { TranslateService }                                                             from '@ngx-translate/core';

import {C8oPageBase, C8oCafUtils}                                                       from 'c8ocaf';
import { Events }                                                                       from './events.service';

/*=c8o_ActionTsImports*/

@Injectable({
    providedIn: 'root'
  })
export class ActionBeans {
    constructor(public translate: TranslateService){
    }
    
    /*=c8o_ActionTsFunctions*/
}
