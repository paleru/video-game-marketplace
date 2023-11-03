# video-game-marketplace

A project I did as part of a school exam/submission, more specifically creating a fictitious video game marketplace that should run as a cross-platform web app for mobile devices.
It utilizes Vue.js, TS, Ionic and Directus.

To run locally:

- clone project, run 'npm install'
- project can be viewed either by:
- running 'ionic serve' and visiting 'http://localhost:8100/' (recommend using web tools to view in mobile format)
  or by emulating to a physical mobile device
- run 'ionic capacitor run platform --livereload --external' (substitute 'platform' with 'android' or 'ios')

* Deploy to Android (works for both Mac and Windows) Android Studio and approriate SDK's must be installed *

- Build by running 'ionic build'
- 'npx cap add android'
- Synchronize files to Android project folder: 'npx cap copy android'
- Open Android project in Android Studio: 'npx cap open android'
- Run app from Android Studio. If deploying to phone, make sure you have developer access and USB-debugging enabled.
- Documentationr: https://capacitorjs.com/docs/android. 

Deploy to Apple iOS (Mac required)

- Xcode og Xcode Command Line Tools must be installed
- Cocoapods must be installed: 'sudo gem install cocoapods'
- Build by running 'ionic build'
- npx cap add ios
- Synchronize files to iOS project folder: 'npx cap copy ios'
- Open iOS-project in Xcode: 'npx cap open ios'
- Run app from Xcode.
- Documentation: https://capacitorjs.com/docs/ios. 
