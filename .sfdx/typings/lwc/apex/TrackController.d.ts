declare module "@salesforce/apex/TrackController.getAccount" {
  export default function getAccount(param: {accountId: any}): Promise<any>;
}
declare module "@salesforce/apex/TrackController.getContact" {
  export default function getContact(param: {contactId: any}): Promise<any>;
}
declare module "@salesforce/apex/TrackController.getTrack" {
  export default function getTrack(param: {contactId: any}): Promise<any>;
}
declare module "@salesforce/apex/TrackController.createData" {
  export default function createData(param: {contactId: any, trackId: any}): Promise<any>;
}
