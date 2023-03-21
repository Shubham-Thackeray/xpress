import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import React, { useContext, useState } from "react";
import { AppContext } from "../services/context";
import { emailValidator, passwordValidator } from "../services/validators";

export default function Auth() {
  // TODO add interface to the app-context
  // @ts-ignore
  const { dispatchAuthEvent } = useContext(AppContext);
  const dummyLogin = { email: "shubham.t@xpressbees.in", password: "test1234" };
  const login = (authData: any) => {
    console.log(authData);
    if (
      authData?.email == dummyLogin?.email &&
      authData?.password == dummyLogin?.password
    ) {
      dispatchAuthEvent("LOGGED_IN", {
        email: authData?.email,
        isAuthenticated: true,
      });
    }
  };

  return (
    <div className=''>
      <div className='Auth-form-container'>
        <div className='Auth-form '>
          <div className='Auth-form-content '>
            <div className='Auth-form-title'>Login</div>
            <Form
              onSubmit={login}
              render={(formRenderProps) => (
                <FormElement
                  style={{
                    maxWidth: 650,
                  }}>
                  <fieldset className={"k-form-fieldset"}>
                    <div className='mb-3'>
                      <Field
                        name={"email"}
                        type={"email"}
                        component={Input}
                        label={"Email"}
                        validator={emailValidator}
                      />
                    </div>
                    <div className='mb-3' style={{ display: "flex" }}>
                      <Field
                        name={"password"}
                        type={"password"}
                        component={Input}
                        label={"Password"}
                        validator={passwordValidator}
                      />
                    </div>
                  </fieldset>

                  <div className='k-form-buttons'>
                    <Button type={"submit"} className='sign-button'>
                      Sign In
                    </Button>
                  </div>
                </FormElement>
              )}
            />
            <div className='mt-4'>
              <p>
                Note: use creds {dummyLogin?.email}, {dummyLogin?.password}
              </p>
              <p>
                Non-persistent login, on reload will land to login, simple auth-guard
                is working so once logged in back/route change wont work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
