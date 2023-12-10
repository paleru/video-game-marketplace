**Note:** The backend for this project was hosted on a free tier of a BaaS (Backend as a Service) called Directus, which has now expired. As a result, the login/create user-features are not operational. 

**Demo Video:** Watch a demonstration of how this project used to work on [Vimeo](https://vimeo.com/manage/videos/893143847).


# video-game-marketplace

A project I did as part of a school exam/submission, more specifically creating a fictitious video game marketplace that should run as a cross-platform web app for mobile devices.
It utilizes Vue.js, TS, Ionic, Directus and Capacitor.

To run locally:

Web:
- clone project, run 'npm install'
- project can be viewed either by:
- running 'ionic serve' and visiting 'http://localhost:8100/' (recommend using web tools to view in mobile format)
  or by emulating to a physical mobile device

Deploy live reload to phone:

- run 'ionic build' 
- run 'ionic capacitor run platform --livereload --external' (substitute 'platform' with 'android' or 'ios')
- If deploying to android, make sure you have developer access and USB-debugging enabled.
- Documentation: https://ionicframework.com/docs/cli/commands/capacitor-run
  
Deploy to Android (works for both Mac and Windows) Android Studio and approriate SDK's must be installed:

- Build by running 'ionic build'
- 'npx cap add android'
- Synchronize files to Android project folder: 'npx cap copy android'
- Open Android project in Android Studio: 'npx cap open android'
- Run app from Android Studio. If deploying to phone (not emulator), make sure you have developer access and USB-debugging enabled.
- Documentation: https://capacitorjs.com/docs/android. 

Deploy to Apple iOS (Mac required)

- Xcode og Xcode Command Line Tools must be installed
- Cocoapods must be installed: 'sudo gem install cocoapods'
- Build by running 'ionic build'
- npx cap add ios
- Synchronize files to iOS project folder: 'npx cap copy ios'
- Open iOS-project in Xcode: 'npx cap open ios'
- Run app from Xcode.
- Documentation: https://capacitorjs.com/docs/ios. 
