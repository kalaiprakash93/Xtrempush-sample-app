import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

declare var XtremePush: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  deviceData:any;
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
    });
  }
  /******************** Register Xtrempush**************************/
  xtremePushRegistration() {
    const gcmProjectNumber = 'dummy';
    XtremePush.register({
        appKey: 'dummy',
		debugLogsEnabled: true,
		inappMessagingEnabled: true,
        deeplinkCallback: 'onDeeplinkReceived',
        ios: {
          pushPermissionsRequest: true,
          locationsEnabled: true,
          locationsPermissionsRequest: true
        },
        android: {
          gcmProjectNumber,
          geoEnabled: true,
          beaconsEnabled: false
        }
      });
    }


onDeeplinkReceived(data) {
  alert('Deeplink Received ' + JSON.stringify(data));
}

deviceInfo() {
  XtremePush.deviceInfo((data) => {
    alert('Device Info' + JSON.stringify(data));
    this.deviceData = data;
  });
}
}
