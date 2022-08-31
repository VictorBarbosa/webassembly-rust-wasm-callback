
#[warn(dead_code)]
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
#[warn(dead_code)]
fn guid() {
    let val = (((js_sys::Math::random() as i64) + 1) * 0x10000) as f64;
    js_sys::Math::floor(val);
}
