package com.friendthem;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.beefe.picker.PickerViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.microsoft.codepush.react.CodePush;
import com.tkporter.sendsms.SendSMSPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.auth0.react.A0Auth0Package;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new FastImageViewPackage(),
            new PickerViewPackage(),
            new ImagePickerPackage(),
            new ReactNativeOneSignalPackage(),
            new ReactNativeContacts(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            SendSMSPackage.getInstance(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNSensitiveInfoPackage(),
            new LinearGradientPackage(),
            new FBSDKPackage(mCallbackManager),
            new ReactNativeConfigPackage(),
            new A0Auth0Package()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
