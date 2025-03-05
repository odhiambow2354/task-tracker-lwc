
# Salesforce Task Tracker LWC

A Lightning Web Component for managing tasks in Salesforce, featuring a clean, minimalist design inspired by modern productivity applications.

## Project URL: https://task-tracker-lwc.vercel.app/
## Features

- Display a list of Task__c records with visual indicators for overdue tasks
- Mark tasks as completed with smooth animations and visual feedback
- Automated processing of overdue tasks via Apex Batch/Queueable job
- REST API endpoint for external access to task data
- Clean, intuitive UI with responsive design and accessibility features

## Deployment Instructions

### Custom Object Deployment

#### Option 1: Using Salesforce DX

1. Clone this repository to your local machine:
   ```bash
   git clone git@github.com:odhiambow2354/task-tracker-lwc.git
   cd task-tracker-lwc
   ```

2. Authorize your Salesforce org:
   ```bash
   sfdx force:auth:web:login -a YourOrgAlias
   ```

3. Deploy the Task__c custom object:
   ```bash
   sfdx force:source:deploy -p force-app/main/default/objects/Task__c
   ```

#### Option 2: Manual Deployment via Setup

1. Navigate to Setup > Object Manager > Create > Custom Object
2. Create a new custom object with the following properties:
   - Label: Task
   - Plural Label: Tasks
   - API Name: Task__c
   - Fields:
     - Name (Text, Required)
     - Due_Date__c (Date)
     - Completed__c (Checkbox, default: false)

### LWC Component Deployment

Deploy the taskList component and related Apex classes:

```bash
sfdx force:source:deploy -p force-app/main/default/lwc/taskList,force-app/main/default/classes
```

## Accessing the LWC Component

### Option 1: Add to Lightning App Page

1. Navigate to Setup > Lightning App Builder
2. Create a new app page or edit an existing one
3. Drag the "Task List" custom component from the custom components section
4. Save and activate the page

### Option 2: Add to Lightning Tab

1. Navigate to Setup > Tabs
2. Create a new Lightning Component tab
3. Select the "taskList" component
4. Give it a label (e.g., "Task Manager")
5. Add the tab to your app via App Manager

## Batch/Queueable Job Usage

The `TaskOverdueBatch` Apex class processes all tasks that are past their due date and marks them as completed.

### Running Manually

Execute the following in Developer Console:

```apex
Database.executeBatch(new TaskOverdueBatch(), 200);
```

### Scheduling the Batch Job

To schedule the batch job to run daily:

```apex
String cronExp = '0 0 0 * * ?'; // Run at midnight every day
System.schedule('Daily Task Overdue Processing', cronExp, new TaskOverdueScheduler());
```

## REST API Endpoint Usage

The TaskAPI class provides a REST endpoint for accessing task data. Here's how to use it:

### Endpoint Information

- **URL**: `/services/apexrest/v1/tasks`
- **Method**: GET
- **Authentication**: OAuth 2.0 required

### Sample Request (Using cURL)

```bash
curl -X GET https://your-instance.my.salesforce.com/services/apexrest/v1/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

### Sample Response

```json
{
  "success": true,
  "data": [
    {
      "id": "a0X1h000003XYZaABC",
      "name": "Complete Project Documentation",
      "dueDate": "2023-04-15",
      "completed": false
    },
    {
      "id": "a0X1h000003XYZbDEF",
      "name": "Schedule Team Meeting",
      "dueDate": "2023-04-10",
      "completed": true
    }
  ]
}
```

## Testing

### Running Apex Tests

```bash
sfdx force:apex:test:run -n "TaskServiceTest,TaskAPITest,TaskOverdueBatchTest" -r human
```

### Test Coverage

The included test classes provide 100% code coverage for all Apex classes.

## Project Structure

```
force-app/
├── main/
│   ├── default/
│   │   ├── objects/
│   │   │   └── Task__c/
│   │   │       ├── Task__c.object-meta.xml
│   │   │       └── fields/
│   │   │           ├── Due_Date__c.field-meta.xml
│   │   │           └── Completed__c.field-meta.xml
│   │   ├── lwc/
│   │   │   └── taskList/
│   │   │       ├── taskList.html
│   │   │       ├── taskList.js
│   │   │       ├── taskList.js-meta.xml
│   │   │       └── taskList.css
│   │   └── classes/
│   │       ├── TaskService.cls
│   │       ├── TaskService.cls-meta.xml
│   │       ├── TaskServiceTest.cls
│   │       ├── TaskServiceTest.cls-meta.xml
│   │       ├── TaskAPI.cls
│   │       ├── TaskAPI.cls-meta.xml
│   │       ├── TaskAPITest.cls
│   │       ├── TaskAPITest.cls-meta.xml
│   │       ├── TaskOverdueBatch.cls
│   │       ├── TaskOverdueBatch.cls-meta.xml
│   │       ├── TaskOverdueScheduler.cls
│   │       ├── TaskOverdueScheduler.cls-meta.xml
│   │       ├── TaskOverdueBatchTest.cls
│   │       └── TaskOverdueBatchTest.cls-meta.xml
```

## Limitations and Assumptions

- The LWC assumes that users have appropriate permissions to view and modify Task__c records
- Due to the asynchronous nature of Batch jobs, there may be a slight delay in processing overdue tasks
- The REST API endpoint returns a maximum of 2000 records per request
- The component currently does not support filtering or sorting beyond the default due date ordering

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[Omondi Wycliffe](mailto:iamwycliffedev.com)
