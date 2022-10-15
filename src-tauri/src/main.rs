#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::path::PathBuf;

use tauri::command;

#[command]
fn exists2(path: PathBuf) -> bool {
    path.exists()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![exists2])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
