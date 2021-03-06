import { browser, by, element,protractor, ElementFinder } from 'protractor';

export class AppPage {
  //---------Navigation-----------
  navigateTo() {
    return browser.get('/');
  }

  navigateToProfile(x){
    return browser.get('/profile/' + x);
  }

  navigateToKweeks(x) {
    return browser.get('/profile/'+x+'/kweeks');
  }

  navigateToFollowers(x) {
    return browser.get('/profile/'+x+'/followers');
  }

  navigateToFollowing(x) {
    return browser.get('/profile/'+x+'/following');
  }

  navigateToLikes(x) {
    return browser.get('/profile/'+x+'/likes');
  }

  navigateToNotifications(x) {
    return browser.get('/notifications/'+x);
  }

  navigateToHome() {
    return browser.get('/home');
  }
  //---------Get-----------

  //---------Field-----------
  getUsernameLoginField(){
    return element(by.xpath('//input[@name = "username"]'));
  }

  getPasswordLoginField(){
    return element(by.xpath('//input[@name = "password"]'));
  }

  getPasswordSignupField(){
    return element(by.xpath('//input[@name = "pass"]'));
  }

  getEmailSignupField(){
    return element(by.xpath('//input[@name = "email"]'));
  }

  getPasswordConfirmationSignupField(){
    return element(by.xpath('//input[@name = "cpass"]'));
  }

  getScreenNameSignupField(){
    return element(by.xpath('//input[@name = "screenname"]'));
  }

  getWriteKweekField(){
    return element(by.xpath('//textarea[@class = "form-control ng-untouched ng-pristine ng-valid"]'));
  }

  getCurrentPasswordField(){
    return element(by.xpath('//input [@id = "currentpassword"]'));
  }

  getUsernameSettingsField(){
    return element(by.xpath('//input [@id = "username"]'));
  }

  getEmailSettingsField(){
    return element(by.xpath('//input [@id = "email"]'));
  }

  getNewPasswordField(){
    return element(by.xpath('//input [@id = "newpassword"]'));
  }

  getVerifyPasswordField(){
    return element(by.xpath('//input [@id = "verfpassword"]'));
  }
  //---------Button-----------
  getTweetToDropDown(){
    return element(by.tagName('p'));
  }

  getLoginButton(){
    return element(by.buttonText('Log in'));
  }

  getNext1SignupButton(){
    return element(by.xpath('//button [@name = "next1"]'));
  }

  getNext2SignupButton(){
    return element(by.xpath('//button [@name = "Next2"]'));
  }

  getKweekButton(){
    return element(by.buttonText('Kweek'));
  }

  getSecondKweekButton(){
    return element.all(by.buttonText('Kweek')).get(1);
  }

  getRekweekButton(){
    return element.all(by.className("fas fa-retweet icons")).first();
  }

  getLikeButton(){
    return element.all(by.className("far fa-heart icons")).first();
  }

  getReplyButton(){
    return element.all(by.className("far fa-comment icons")).first();
  }

  getDeleteKweekx(){
    return element.all(by.className("close mat-icon notranslate material-icons mat-icon-no-color")).first();
  }

  getDeleteKweekButton(){
    return element(by.xpath('//*[@id="delete"]'));
  }

  getKweekToButton(){
    return element(by.buttonText('Tweet To'));
  }

  getDropDownMenuButton(){
    return element(by.xpath('//a [@class = "dropdown-toggle"]'));
  }

  getProfileButton(){
    return element(by.xpath('//span [@class = "glyphicon glyphicon-user"]'));
  }

  getSettingsButton(){
    return element(by.xpath('//span [@class = "glyphicon glyphicon-cog"]'));
  }

  getSaveChangesSettingsButton(){
    return element(by.buttonText('Save Changes'));
  }

  getChangePasswordSettingsButton(){
    return element(by.buttonText('Change Password'));
  }

  getOkButton(){
    return element(by.buttonText('OK'));
  }

  getLogoutButton(){
    return element(by.xpath('//span [@class = "glyphicon glyphicon-arrow-left"]'));
  }
  //---------Text-----------
  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getFirstKweekText(){
    return element.all(by.xpath('//div [@class = "kweek-text"]')).first();
  }

  getCoverHeadingText(){
    return element(by.xpath('//h1 [@class = "cover-heading"]'));
  }
  //---------Card-----------
  getDatePickerSignupBoard(){
    return element(by.xpath('//*[local-name() = "svg"]'));
  }

  getDateDaySignupBoard(){
    return element.all(by.cssContainingText('.mat-calendar-body-cell-content', '1')).first();
  }
  //---------Dawood Edits-----------

  getDropDownHomeToggle(){
    return element(by.className('dropdown-toggle'));
  }

  getDropDownHomeToggleProfile(){
    return element(by.xpath('/html/body/app-root/app-home/app-nav-bar/nav/div/div[2]/ul[2]/li[2]/ul/li[1]/a'));
  }

  getProfileName(){
    return element(by.className('Profile-Name'));
  }

  getHisScreenName(){
    return element(by.className('Profile-ScreenName'));
  }

  getHisProfileName(){
    return element(by.xpath('/html/body/app-root/app-main-profile/div/div[2]/div/div[2]/div/div[2]/app-mini-profile/div[1]/div[1]/div/div[2]/div/div[3]/div[1]'));
  }

  getFollwingList(){
    return element.all(by.className('container')).count();
  }


  getTweetToButton(){
    return element(by.className('btn btn-primary Kweek-Button'));
  }

  getMessageButton(){
    return element(by.className('btn btn-primary Msg-Button'));
  }


  getHisFollowButton(){
    return element(by.xpath('//*[@id="header"]/div[4]/div/div[2]/button'));
  }

  getMyFollowButton(){
    return element(by.buttonText('Follow'));
  }
  getHisFollowingButton(){
    return element(by.className('btn btn-primary following-button'));
  }

  getMyFollowingButton(){
    return element(by.buttonText('Following'));
  }


  getHisDropDownButton(){
    return element(by.id('userActionDropdownMenuButton'));
  }

  getMyDropDownButton(){
    return element(by.xpath('//*[@id="dropdownMenuButton"]'));
  }


  getMuteButton(){
    return element(by.xpath('//*[@id="userActionDropDownMenu"]/li[3]'));
  }

  getBlockButton(){
    return element(by.xpath('//*[@id="userActionDropDownMenu"]/li[4]'));
  }

  getUnblockButton(){
    return element(by.xpath('//*[@id="userActionDropDownMenu"]/li[2]'));
  }

  getSignUpTitle(){
    return element(by.className('active'));
  }


  getMyBlockedButton(){
    return element(by.xpath('//*[@id="userActionDropDownMenu"]/li[2]'));
  }

  getBlockedButton(){
    return element(by.xpath('//*[@id="userActionDropDownMenu"]/li[2]'));
  }

  getEditButton(){
    return element(by.className('btn btn-outline-primary edit-button'));
  }

  getSaveChangesButton(){
    return element(by.className('btn btn-primary saveChanges-button'));
  }

  getCancelChangesButton(){
    return element(by.className('btn btn-primary cancel-button'));
  }

  getChangeProfilePictureButton(){
    return element(by.id('profilePicdropdownMenuButton'));
  }

  getChangeProfilePictureItems(i){
    return element.all(by.className('dropdown-item')).get(i);
  }

  getSelectItemButton(){
    return element(by.xpath('//*[@id="mat-dialog-0"]/app-edit-image/div[1]/button'));
  }


  getMyScreenName(){
    return element(by.id('EditName'));
  }

  getBio(){
    return element(by.id('EditBio'));
  }

  getProfileBio(){
    return element(by.className('Profile-Bio'));
  }

  getProfileTrends(){
    return element.all(by.xpath('//*[@id="Trends-Item"]/h1'));
  }

  getPrompt(){
    return element(by.id('prompt'));
  }

  getLikeCount(){
    return element.all(by.xpath('//*[@id="Taps"]/li[4]/a/text()[2]'));
  }

/////////////////////////Message/////////////////////////////////////////


  getNewMessage(){
    return element(by.xpath('/html/body/app-root/app-home/app-nav-bar/nav/div/div[2]/ul[1]/li[3]/a'));
  }

  getChatBox(){
    return element(by.xpath('//*[@id="message"]'));
  }

  getSentMsg(){
    return element.all(by.className('msgText msgText2')).last();
  }

  getLastSentMsg(){
    return element.all(by.xpath('//p [@class = "lastmsg"]')).first();
  }

  getRecentReciever(){
    return element(by.xpath('//*[@id="mat-dialog-0"]/app-chat/div/app-inbox/div[2]/div[1]'));
  }

  getNewMessageButton(){
    return element(by.id('new'));
  }
  getSendButton(){
    return element(by.xpath('//*[@id="send"]'));
  }

  getRecieverNameField(){
    return element(by.css('[placeholder = "Enter a name"]'));
  }

  getReciever(){
    return element(by.xpath('//*[@id="mat-dialog-0"]/app-chat/div/app-inbox-list/div[2]/div[3]'));
  }

  getNextButton(){
    return element(by.buttonText('Next'));
  }

  getBackButton(){
    return element(by.id('back'));
  }
///////////////////////Search//////////////////////////////////////

  getHomeSearchBox(){
    return element(by.css('[placeholder = "Search..."]'));
  }

  getSearchBox(){
    return element(by.xpath('/html/body/app-root/app-search/app-nav-bar/nav/div/div[2]/ul[2]/li[1]/form/input'));
  }

  getSearchProfileName(){
    return element(by.xpath('/html/body/app-root/app-search/div[3]/div/div[2]/app-mini-profile/div[1]/div[1]/div/div[2]/div/div[3]/div[1]'));
  }

  getProfileSearchBox(){
    return element(by.xpath('/html/body/app-root/app-main-profile/div/app-nav-bar/nav/div/div[2]/ul[2]/li[1]/form/input'));
  }

  getSearchResult(){
    return element(by.xpath('/html/body/app-root/app-search/app-nav-bar/nav/div/div[2]/ul[2]/li[1]/form/div/a'));
  }

  getProfileSearchResult(){
    return element(by.xpath('/html/body/app-root/app-main-profile/div/app-nav-bar/nav/div/div[2]/ul[2]/li[1]/form/div/div/a'));
  }

  navigateToSearchSections(x,y) {
    return browser.get('/search/'+x+'?filterBy='+y);
  }

  getSearchKeyWord(){
    return element.all(by.className('kweek-text')).first();
  }

  getSearchBar(){
    return element(by.xpath('//*[@id="first"]'));
  }
/////////////////////////Notifications/////////////////////////////////////////

  getHomeKweekButton(){
    return element(by.xpath('/html/body/app-root/app-home/app-nav-bar/nav/div/div[2]/ul[2]/li[3]/form/div/button'));
  }

  getKweekField(){
    return element(by.xpath('//*[@id="kweek"]'));
  }

  getKweekFieldButton(){
    return element(by.xpath('//*[@id="mat-dialog-0"]/app-new-kweek/div[2]/div[2]/div[2]/span[2]/button'));
  }

  getMentionNotificationText(){
    return element(by.xpath('/html/body/app-root/app-notifications/div/div/div[2]/app-mentionslist/app-kweek/div/div/div[1]/div/div[3]/div/div[3]/div/p'));
  }

  getLike(){
    return element.all(by.className('like')).get(0);
  }

  getTypeNotificationText(){
    return element(by.xpath('(//h5)[1]'));
  }

  getNotificationCard(){
    return element(by.xpath('/html/body/app-root/app-notifications/div/div/div[2]/app-mentionslist/app-kweek/div/div/div[1]/div/div[3]/div/div[3]/div/p'));
  }

  getUsernameFirstNotification(){
    return element(by.xpath('(//span [@class = "userName"])[0]'));
  }
/*

    getBackButton(){
      return element(by.id('back'));
    }
*/
    getAllButton(){
      return element(by.className('btn btn-outline-primary'));
    }


    browserPause(x) {
      return browser.sleep(x);
    }

    browser() {
      return browser;
    }

    navigateToLogin() {
      return browser.get('/login');
    }
  }

export class utilityFunctions{
  page: AppPage;
  constructor(page: AppPage){
    this.page = page;
  }
  browserPause(x) {
    return browser.sleep(x);
  }

  getElementWithText(selector, text){
    return element(by.cssContainingText(selector, text));
  }

  login(username, password){
    this.navigateToLogin();
    this.browserPause(1000);
    this.page.getUsernameLoginField().sendKeys(username);
    this.page.getPasswordLoginField().sendKeys(password);
    this.browserPause(1000);
    this.page.getLoginButton().click();
    this.browserPause(1000);
  }

  navigateToLogin() {
    this.page.navigateTo();
    element(by.buttonText('Log in')).click();
  }

  navigateToSignUp() {
    browser.get('/signup');
    // this.page.navigateTo();
    // element(by.xpath('/html/body/app-root/app-welcome/body/div/div/main/button[1]')).click();
  }

  navigateToMyProfile() {
    this.page.getDropDownMenuButton().click();
    this.browserPause(1000);
    this.page.getProfileButton().click();
  }

  pressEnter(element){
    element.sendKeys(protractor.Key.RETURN);
  }

  logout(){
    this.page.getDropDownMenuButton().click();
    this.browserPause(1000);
    this.page.getLogoutButton().click();
    this.browserPause(1000);
  }

  async sendClick(element: ElementFinder): Promise<boolean> {
    try { 
      if(!await element.isDisplayed()) {
        return false;
      }
      await browser.executeScript('arguments[0].click();', await element.getWebElement());
      return true;
    }
    catch (err) {
      return false;
    }
  }
}
