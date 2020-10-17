use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn adds_two(number: usize) -> usize {
    number + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(adds_two(2), 4);
    }
}
