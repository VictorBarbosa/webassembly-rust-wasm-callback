use js_sys::Function;
use wasm_bindgen::{
    prelude::{wasm_bindgen, Closure},
    JsCast, JsValue,
};
#[derive(Clone)]
#[wasm_bindgen]

pub struct RetEx {
    total: usize,
    return_msg: String,
}

#[wasm_bindgen]
impl RetEx {
    #[wasm_bindgen(constructor)]
    pub fn new(total: usize, return_msg: String) -> RetEx {
        crate::utils::set_panic_hook();
        RetEx { return_msg, total }
    }

    #[wasm_bindgen(getter=total)]
    pub fn total(&self) -> usize {
        self.total
    }

    #[wasm_bindgen(setter=total)]
    pub fn set_total(&mut self, total: usize) {
        self.total = total;
    }

    #[wasm_bindgen(getter)]
    pub fn msg(&self) -> String {
        self.return_msg.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_msg(&mut self, msg: String) {
        self.return_msg = msg;
    }
}

#[derive(Clone)]
#[wasm_bindgen]
pub struct ExClass;
#[wasm_bindgen]
 
impl ExClass {
    #[wasm_bindgen(constructor)]
    pub fn new() -> ExClass {
        crate::utils::set_panic_hook();
        ExClass {}
    }

 
    #[wasm_bindgen(js_name=conterPrimer)]
    pub fn counter_primer(self, counter: u32) -> RetEx {
        let mut prime_list: Vec<u32> = Vec::new();
        for i in 0..counter {
            if Self::is_prime(i) {
                prime_list.push(i);
            }
        }

        if prime_list.len() > 0 {
            let msg = String::from(&format!(
                "Total - {} primers number in {}, msg from wasm",
                prime_list.len(),
                counter
            ));
            let ret = RetEx::new(prime_list.len(), msg);
            return ret;
        } else {
            let ret = RetEx::new(0, "Zero".to_string());
            return ret;
        }

        // self.counter_finish();
    }

    ///
    /// The callback has an JSON string than must be parse to RetEx
    ///
    #[wasm_bindgen(js_name = "exFunctionWithCallback")]
    pub async fn ex_function_with_callback(self, counter: u32, callback: Function) {
        let window = web_sys::window().expect("should have a window in this context");

        let ret = self.callback_function(counter, callback).unwrap();
        window
            .set_timeout_with_callback_and_timeout_and_arguments_0(ret.as_ref().unchecked_ref(), 0)
            .unwrap();

        ret.forget();
    }

    fn is_prime(n: u32) -> bool {
        for a in 2..n {
            if n % a == 0 {
                return false; // if it is not the last statement you need to use `return`
            }
        }
        true // last value to return
    }

    fn callback_function(
        self,
        counter: u32,
        call: js_sys::Function,
    ) -> Result<Closure<dyn Fn() -> ()>, String> {
        let closure = Closure::new(move || {
            let mut prime_list: Vec<u32> = Vec::new();
            for i in 0..counter {
                if Self::is_prime(i) {
                    prime_list.push(i);
                }
            }
            let this = JsValue::null();

            let msg = JsValue::from_str(&format!(
                "Total - {} primers number in {}, msg  from wasm",
                prime_list.len(),
                counter
            ));

            call.call1(&this, &msg).unwrap();
        });
        Ok(closure)
    }
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}
