import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app.module';
import { isAndroid } from '@nativescript/core/platform';
import { TextBase } from '@nativescript/core/ui/text-base';
import { fontSizeProperty } from '@nativescript/core/ui/styling/style-properties';
import { layout } from "@nativescript/core/utils";

if (environment.production) {
  enableProdMode();
}

if (isAndroid) {
  TextBase.prototype[fontSizeProperty.setNative] = function (value) {
    if (!this.formattedText || (typeof value !== "number")) {
        if (typeof value === "number") {
            this.nativeTextViewProtected.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, layout.toDevicePixels(value));
        } else {
            this.nativeTextViewProtected.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, value.nativeSize);
        }
    }
  };
}

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});
