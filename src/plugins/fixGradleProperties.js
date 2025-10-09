// src/plugins/fixGradleProperties.js
/**
 * ✅ Plugin otomatis untuk memperbaiki konfigurasi Gradle & local.properties
 * Akan berjalan setiap kali kamu menjalankan `npx expo prebuild`
 *
 * Fitur:
 *  - Menunggu sampai folder android siap sebelum modifikasi
 *  - Memastikan build.gradle memiliki repository yang benar
 *  - Membuat file local.properties otomatis (dengan SDK path)
 *  - Memberikan log berwarna agar mudah dipahami
 */

const fs = require("fs");
const path = require("path");
const { withDangerousMod } = require("@expo/config-plugins");

// Utility kecil untuk delay async
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Tunggu folder android terbentuk
async function ensureAndroidFolder(root) {
  const appPath = path.join(root, "android", "app", "src", "main", "java");
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(appPath)) return true;
    console.log(`⏳ [fixGradle] Menunggu folder android siap... (${i + 1})`);
    await delay(1000);
  }
  return false;
}

// Fungsi utama plugin
const withFixGradleProperties = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const androidDir = path.join(projectRoot, "android");
      const buildGradle = path.join(androidDir, "build.gradle");
      const localProps = path.join(androidDir, "local.properties");

      console.log("\n🚀 [fixGradle] Memulai perbaikan Gradle otomatis...\n");

      // Pastikan folder android sudah siap
      const ready = await ensureAndroidFolder(projectRoot);
      if (!ready) {
        console.warn("⚠️ [fixGradle] Folder android belum siap, lewati modifikasi.");
        return config;
      }

      // ✅ Perbaiki build.gradle (root)
      if (fs.existsSync(buildGradle)) {
        let content = fs.readFileSync(buildGradle, "utf8");

        if (!content.includes("mavenCentral()")) {
          console.log("🛠️ [fixGradle] Menambahkan repository yang hilang...");
          content = content.replace(
            /repositories\s*{([^}]*)}/,
            `repositories {
    google()
    mavenCentral()
    maven { url 'https://jitpack.io' }
}`
          );
          fs.writeFileSync(buildGradle, content, "utf8");
          console.log("✅ [fixGradle] build.gradle berhasil diperbarui!");
        } else {
          console.log("ℹ️ [fixGradle] build.gradle sudah sesuai, tidak perlu diubah.");
        }
      } else {
        console.warn("⚠️ [fixGradle] File build.gradle tidak ditemukan.");
      }

      // ✅ Pastikan local.properties ada dan berisi SDK path
      if (!fs.existsSync(localProps)) {
        const sdkPath =
          process.env.ANDROID_SDK_ROOT ||
          path.join(
            process.env.HOME || process.env.USERPROFILE,
            "AppData",
            "Local",
            "Android",
            "Sdk"
          );

        fs.writeFileSync(localProps, `sdk.dir=${sdkPath.replace(/\\/g, "/")}\n`);
        console.log(`✅ [fixGradle] local.properties dibuat dengan sdk.dir=${sdkPath}`);
      } else {
        console.log("ℹ️ [fixGradle] local.properties sudah ada, tidak perlu dibuat ulang.");
      }

      console.log("\n🎉 [fixGradle] Semua konfigurasi Gradle telah diverifikasi!\n");

      return config;
    },
  ]);
};

module.exports = withFixGradleProperties;
