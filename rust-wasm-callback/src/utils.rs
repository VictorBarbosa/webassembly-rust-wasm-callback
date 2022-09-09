use wasm_bindgen::{prelude::{wasm_bindgen, Closure}, JsValue, JsCast};

 
pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}
#[ignore = ""]
fn guid() {
    let val = (((js_sys::Math::random() as i64) + 1) * 0x10000) as f64;
    js_sys::Math::floor(val);
}

#[wasm_bindgen]
pub fn callback_ex(count: u8, callback: js_sys::Function) {
    let this = JsValue::null();
    for index in 1..(count + 1) {
        let msg = JsValue::from_str(format!("msg {} from wasm", index).as_str());
        callback.call1(&this, &msg).unwrap();
    }
}

#[wasm_bindgen]
/// This sample shows how you can passa a counter and receive call back or a error message
/// if the callback funtion is empty
pub fn callback_ex_with_option(count: i32, callback: Option<js_sys::Function>) {
    let this = JsValue::null();

    for index in 1..(count + 1) {
        match &callback {
            Some(func) => {
                let msg = JsValue::from_str(format!("msg {} from wasm", index).as_str());
                func.call1(&this, &msg).unwrap();
            }
            call => {
                panic!("The callback is missing");
            }
        }
    }
}

#[wasm_bindgen]
pub async fn start(call: js_sys::Function) {
    let window = web_sys::window().expect("should have a window in this context");

    let ret = callback(call).unwrap();
    window
        .set_timeout_with_callback_and_timeout_and_arguments_0(ret.as_ref().unchecked_ref(), 0)
        .unwrap();
    ret.forget()
}
fn callback(call: js_sys::Function) -> Result<Closure<dyn Fn() -> ()>, String> {
    let closure = Closure::new(move || {
        let this = JsValue::null();
        let msg = JsValue::from_str(format!("Fim do timeout").as_str());
        call.call1(&this, &msg).unwrap();
    });
    Ok(closure)
}
 
#[wasm_bindgen]
pub fn create_event() -> web_sys::CustomEvent {
    let event = web_sys::CustomEvent::new("myownevent").unwrap();
    let msg = "{amigo:\"from wasm\"}";
    event.init_custom_event(msg);

    return event;
}


 