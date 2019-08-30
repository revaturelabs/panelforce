# Panelforce

Panelforce is designed to streamline the Revature Panel process. Integrated within Salesforce, Panelist can quickly and efficiently conduct a Panel for a given associate.

### Assumptions
1. [Visual Studio Code](https://code.visualstudio.com/) and [SFDX Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode) has already been downloaded.
2. Developer has a **Developer Edition** which is connected to a local **SFDX Project**.
    - See: https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth_web_flow.htm


### Panelforce Development Model

This application uses the **Org Development Model** in which each Developer has their own **Salesforce Org** in which **Dev Hub** is enabled.

#### Steps to get this file in this repo to your org ####
1. Clone this repo to your local machine.
2. Push the files specified in the [Manifest File](https://github.com/revaturelabs/panelforce/blob/master/manifest/package.xml) to your org.
    - sfdx force:source:deploy -x manifest/package.xml -u <insertUsernameHere>
        
        
        
#### Please go into execute anonymous when you first enter and org and execute: ####
    PanelForceDataCreator.createData();
- This will add default data to the org. Note that it does not currently (8/30/19) create Assessments and as a result, Assessment Line Items.




