/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
package io.skaly.cordova.sdk;

import android.app.Activity;
import android.os.Handler;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import io.skaly.sdk.Sex;
import io.skaly.sdk.Skaly;
import kotlin.Unit;
import kotlin.jvm.functions.Function1;
import kotlin.jvm.functions.Function0;
import com.beust.klaxon.Klaxon;
import io.skaly.sdk.scales.ScaleReply;
import io.skaly.sdk.scales.ScaleReplyKt;

public class SkalySDK extends CordovaPlugin {
    public static final String TAG = "SkalySDK";

    private static Skaly skaly;
    private Activity activity;

    /**
     * Constructor.
     */
    public SkalySDK() {
    }

    /**
     * Sets the context of the Command. This can then be used to do things like
     * get file paths associated with the Activity.
     *
     * @param cordova The context of the main Activity.
     * @param webView The CordovaWebView Cordova is running in.
     */
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        this.activity = cordova.getActivity();
    }

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback id used when calling back into JavaScript.
     * @return                  True if the action was valid, false if not.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Handler mainHandler = new Handler(activity.getMainLooper());
        System.out.println(args);
        if ("start".equals(action)) {
            String rootKey = args.getString(0);
            mainHandler.post(new Runnable() {
                @Override
                public void run() {
                    skaly = new Skaly(SkalySDK.this.activity, rootKey);
                    callbackContext.success();
                }
            });
        }
        else if ("addScale".equals(action)) {
            String supportedScalesStr = args.getString(0);
            String[] supportedScales = new String[0];
            System.out.println("supportedScalesStr" + supportedScalesStr + ";");
            if(supportedScalesStr.length() > 0) {
                supportedScales = supportedScalesStr.split(",");
            }
            final List<String> supportedScalesList = Arrays.asList(supportedScales);
            mainHandler.post(new Runnable() {
                @Override
                public void run() {
                    skaly.addScale(supportedScalesList, new Function1<Boolean, Unit>() {
                        @Override
                        public Unit invoke(Boolean success) {
                            if(success) {
                                callbackContext.success();
                            }
                            else {
                                callbackContext.error("Failed adding scale");
                            }
                            return null;
                        }
                    });
                }
            });
        }
        else if ("addIdentity".equals(action)) {
            String handle = args.getString(0);
            Sex sex = args.getInt(1)  == 0 ? Sex.Male : Sex.Female;
            Date birthday = new Date(args.getLong(2) * 1000);
            int length = args.getInt(3);
            mainHandler.post(new Runnable() {
                @Override
                public void run() {
                    try {
                        skaly.addIdentity(handle, sex, birthday, length, new Function1<Boolean, Unit>() {
                            @Override
                            public Unit invoke(Boolean success) {
                                if(success) {
                                    callbackContext.success();
                                }
                                else {
                                    callbackContext.error("Failed adding user");
                                }
                                return null;
                            }
                        });
                    }
                    catch (Exception e) {
                        e.printStackTrace();
                        callbackContext.error(e.getMessage());
                    }
                }
            });
        }
        else if ("startReading".equals(action)) {
            mainHandler.post(new Runnable() {
                @Override
                public void run() {
                    skaly.startReading(new kotlin.jvm.functions.Function3<Boolean, String, ScaleReply, Unit>() {
                        @Override
                        public Unit invoke(Boolean success, String scannedHandle, ScaleReply scaleReply) {
                            try {
                                callbackContext.success(new JSONObject(ScaleReplyKt.toJSONString(scaleReply)));
                            }
                            catch(Exception e) {
                                e.printStackTrace();
                                callbackContext.error(e.getMessage());
                            }
                            return null;
                        }
                    });
                }
            });
        }
        else if ("allowAccessToData".equals(action)) {
            String to = args.getString(0);
            String handle = args.getString(1);
            mainHandler.post(new Runnable() {
                @Override
                public void run() {
                    skaly.allowAccessToData(to, handle, new Function0<Unit>() {
                        @Override
                        public Unit invoke() {
                            callbackContext.success();
                            return null;
                        }
                    });
                }
            });
        }
        else {
            return false;
        }
        return true;
    }

}
