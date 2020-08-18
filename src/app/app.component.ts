import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import {Plugins,PushNotificationToken} from '@capacitor/core';

declare var XtremePush: any;
const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
	  this.xtremePushRegistration();
    });
  }
  /******************** Register Xtrempush**************************/
  xtremePushRegistration() {
	  PushNotifications.addListener('registration',
        // tslint:disable-next-line: no-shadowed-variable
        (token: PushNotificationToken) => {
          XtremePush.registerWithToken(token);
        }
      );
    const gcmProjectNumber = 'dummy';
    XtremePush.register({
        appKey: 'token',
		debugLogsEnabled: true,
		inappMessagingEnabled: true,
        ios: {
          pushPermissionsRequest: false,
          locationsEnabled: true,
          locationsPermissionsRequest: true,
		  sandboxMode: true
        },
        android: {
          gcmProjectNumber,
          geoEnabled: true,
          beaconsEnabled: false
        }
      });
    }
	xtremePushPermission(){
		 XtremePush.requestPushPermissions();
	}
}
