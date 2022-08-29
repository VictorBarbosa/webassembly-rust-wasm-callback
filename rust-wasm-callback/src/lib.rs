mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

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
