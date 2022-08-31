use std::fmt::Error;

use wasm_bindgen::prelude::wasm_bindgen;

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
        ExClass {}
    }

    pub   fn ex_function(self, counter: u32) ->  RetEx {
        let mut prime_list: Vec<u32> = Vec::new();
        for i in 0..counter {
            if Self::is_prime(i) {
                prime_list.push(i);
            }
        }
      return     RetEx::new(prime_list.len(), format!("Total - {} primers number in {}, msg  from wasm",prime_list.len(), counter));
    }

    fn is_prime(n: u32) -> bool {
        for a in 2..n {
            if n % a == 0 {
                return false; // if it is not the last statement you need to use `return`
            }
        }
        true // last value to return
    }
}
