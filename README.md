# Investor-Agent Curriculum & Savings Tool

An interactive, responsive Single Page Application (SPA) designed to help you go from zero to a licensed real estate agent with the specific goal of representing yourself in personal and investment property purchases to save thousands in commissions.

## Features Included
1. **Interactive Curriculum Roadmap:** A step-by-step 7-phase curriculum tracking your progress with persistent local storage.
2. **Dynamic Savings & ROI Calculator:** Calculate gross commissions, broker splits, startup overhead, net first-deal value, and break-even targets.
3. **Broker Interview Guide & Comparison Sheet:** Log questions and compare fee structures (100% commission flat-fee vs. traditional splits).
4. **State-by-State Directory:** Filterable catalog of pre-licensing education hours and direct links to state Real Estate Commissions.
5. **Resource Library:** Easy access to recommended online licensing schools, exam prep tools, and IRS commission rebate guidelines.

---

## Local Development

You can preview the website locally using the Firebase emulator or any local static server.

### Option A: Using Firebase Emulator (Recommended)
1. Run the following command in this directory:
   ```bash
   npx -y firebase-tools@latest emulators:start --only hosting
   ```
2. Open your browser and navigate to: [http://localhost:5000](http://localhost:5000)

### Option B: Using standard Python HTTP server
If you do not have Node.js or Firebase tools ready, run:
```bash
python3 -m http.server 8000 -d public
```
Then navigate to: [http://localhost:8000](http://localhost:8000)

---

## Deploying to Firebase Hosting

This project is configured as a serverless static website deployable to Firebase in minutes.

### 1. Log in to Firebase
```bash
npx -y firebase-tools@latest login
```
*(This will open a browser window to authenticate with your Google account)*

### 2. Connect to a Firebase Project
If you have a Firebase project already created:
```bash
npx -y firebase-tools@latest use --add <your-firebase-project-id>
```
If you don't have a project yet, create one on the [Firebase Console](https://console.firebase.google.com/), and then run the command above.

### 3. Deploy
```bash
npx -y firebase-tools@latest deploy --only hosting
```
*(Once completed, the CLI will output your live URL: `https://<your-project-id>.web.app`)*
