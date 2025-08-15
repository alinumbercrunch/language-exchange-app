# Core Data Flow - Language Exchange App

This document shows the data flow for our main user operations and how utilities work together across the full stack.

## Frontend-Backend Integration Flow

This diagram shows how utilities, helpers, and services work together across the full stack.

```mermaid
graph TB
    %% Frontend Components
    subgraph "Frontend Layer"
        direction TB
        UI[React Component<br/>Registration Form]
        FormHook[useFormState Hook<br/>Form Management]
        AsyncHook[useAsync Hook<br/>State Management]
        FormHelpers[FormHelpers<br/>setNestedValue]
        FrontendService[userService.ts<br/>API Calls]
        Constants[formConstants.ts<br/>Options & Config]
    end

    %% Network Boundary
    Network{{HTTP Request/Response<br/>JSON Data}}

    %% Backend Components  
    subgraph "Backend Layer"
        direction TB
        Routes[userRoutes.ts<br/>Route Definition]
        Validators[Validation Middleware<br/>express-validator]
        Controller[userController.ts<br/>Request Handler]
        ResponseHelper[responseHelpers.ts<br/>Format Responses]
        ValidatorHandler[validatorHandler.ts<br/>Error Processing]
        UserService[userService.ts<br/>Business Logic]
        AuthService[authService.ts<br/>JWT Management]
        ValidationConst[validationConstants.ts<br/>Rules & Messages]
        UserModel[User.ts<br/>Mongoose Model]
    end

    %% Database
    DB[(MongoDB<br/>User Collection)]

    %% Frontend Flow Connections
    UI --> FormHook
    FormHook --> FormHelpers
    UI --> AsyncHook
    AsyncHook --> FrontendService
    Constants --> UI
    FrontendService --> Network

    %% Network Layer
    Network --> Routes
    Routes --> ResponseHelper
    ResponseHelper --> Network

    %% Backend Flow Connections
    Routes --> Validators
    Validators --> ValidatorHandler
    ValidatorHandler --> Controller
    Controller --> UserService
    UserService --> AuthService
    UserService --> UserModel
    UserModel --> DB
    
    %% Cross-cutting concerns
    ValidationConst --> Validators
    ValidationConst --> UserService
    Controller --> ResponseHelper
    ValidatorHandler --> ResponseHelper

    %% Response Flow (dotted lines)
    DB -.-> UserModel
    UserModel -.-> UserService
    AuthService -.-> UserService
    UserService -.-> Controller
    Controller -.-> ResponseHelper

    classDef frontend fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:#ffffff
    classDef network fill:#FF5722,stroke:#D84315,stroke-width:3px,color:#ffffff
    classDef backend fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#ffffff
    classDef database fill:#9C27B0,stroke:#7B1FA2,stroke-width:2px,color:#ffffff
    classDef utilities fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:#ffffff

    class UI,FormHook,AsyncHook,FrontendService,Constants frontend
    class FormHelpers,ResponseHelper,ValidatorHandler,AuthService,ValidationConst utilities
    class Network network
    class Routes,Validators,Controller,UserService,UserModel backend
    class DB database
```

## Utility Functions Integration Map

This shows how different utility functions and helpers are used across the application:

```mermaid
graph LR
    %% Frontend Utilities
    subgraph "Frontend Utilities"
        FF["formHelpers.ts<br/>setNestedValue()<br/>Form data manipulation"]
        FC["formConstants.ts<br/>PROFICIENCY_OPTIONS<br/>GENDER_OPTIONS<br/>Field definitions"]
        UFS["useFormState.ts<br/>Form state management<br/>Change handlers<br/>Reset functionality"]
        UA["useAsync.ts<br/>Loading states<br/>Error handling<br/>Async operations"]
    end

    %% Shared Layer
    subgraph "Shared Interfaces"
        INT["user.interface.ts<br/>IUserRegistrationRequest<br/>Type definitions<br/>Data contracts"]
        ERR["appError.ts<br/>Custom error class<br/>Error standardization"]
    end

    %% Backend Utilities  
    subgraph "Backend Utilities"
        RH["responseHelpers.ts<br/>authSuccess()<br/>error()<br/>success()<br/>validationError()"]
        VH["validatorHandler.ts<br/>validatedAsyncHandler<br/>Error formatting<br/>Middleware wrapper"]
        VC["validationConstants.ts<br/>VALIDATION_RULES<br/>ERROR_MESSAGES<br/>Business rules"]
        AH["asyncHandler.ts<br/>Async error wrapper<br/>Try/catch automation"]
    end

    %% Usage Connections
    UFS --> FF
    UFS --> INT
    UA --> ERR
    FC --> INT
    
    VH --> RH
    VH --> VC
    RH --> INT
    AH --> ERR
    
    %% Cross-layer connections
    FF --> INT
    RH --> ERR

    %% Styling
    classDef frontend fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:#ffffff
    classDef shared fill:#FF5722,stroke:#D84315,stroke-width:2px,color:#ffffff  
    classDef backend fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#ffffff

    class FF,FC,UFS,UA frontend
    class INT,ERR shared
    class RH,VH,VC,AH backend
```

## Complete Request Lifecycle with Utils

This shows a complete request from form submission to database response, highlighting where each utility is used:

```mermaid
sequenceDiagram
    participant User as User
    participant Form as React Form
    participant FormHook as useFormState
    participant AsyncHook as useAsync  
    participant Service as Frontend Service
    participant Route as Express Route
    participant Validator as Validation Middleware
    participant Handler as ValidatorHandler
    participant Controller as User Controller
    participant UserSvc as User Service
    participant AuthSvc as Auth Service
    participant Model as User Model
    participant DB as MongoDB

    User->>Form: Fill Registration Form
    Form->>FormHook: handleChange()
    FormHook->>FormHook: setNestedValue() helper
    
    User->>Form: Submit Form
    Form->>AsyncHook: execute()
    AsyncHook->>Service: registerUser()
    Service->>Route: POST /api/users/register
    
    Route->>Validator: Apply validation rules
    Validator->>Handler: validatedAsyncHandler()
    Handler->>Handler: Check validation errors
    
    alt Validation Errors
        Handler->>Handler: formatValidationErrors()
        Handler->>AsyncHook: ValidationError response
        AsyncHook->>Form: Display errors
    else Valid Data
        Handler->>Controller: registerUser()
        Controller->>UserSvc: createUser()
        UserSvc->>UserSvc: checkUserExists()
        UserSvc->>Model: new User()
        Model->>DB: save()
        DB->>Model: User document
        Model->>UserSvc: Saved user
        UserSvc->>AuthSvc: generateToken()
        AuthSvc->>UserSvc: JWT token
        UserSvc->>Controller: {user, token}
        Controller->>Handler: ResponseHelper.authSuccess()
        Handler->>AsyncHook: Success response
        AsyncHook->>Form: Registration complete
    end

    %% Highlighting utility usage
    Note over FormHook: Uses formHelpers.ts
    Note over Handler: Uses responseHelpers.ts<br/>& validationConstants.ts
    Note over AuthSvc: Uses JWT utilities
        Note over AsyncHook: Uses error handling
```

## Authentication Flow
```

## Core User Registration Data Flow

This diagram shows the simplified data flow for our main user operations:

```mermaid
flowchart TD
    A[User Registration Form] --> B[Form Validation]
    B --> C[API Call POST users register]
    
    C --> D{Middleware Validation}
    D -->|Valid| E[userController registerUser]
    D -->|Invalid| F[Return Validation Errors]
    
    E --> G[UserService createUser]
    G --> H{Check User Exists}
    H -->|Exists| I[Throw Error User Exists]
    H -->|New User| J[Create User Model]
    
    J --> K[Hash Password Pre-save Hook]
    K --> L[Save to MongoDB]
    L --> M[Generate JWT Token AuthService]
    
    M --> N[ResponseHelper authSuccess]
    N --> O[Return User and Token]
    O --> P[Frontend Success Handler]
    
    I --> Q[ResponseHelper error]
    F --> Q
    Q --> R[Frontend Error Handler]
    
    classDef userAction fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:#ffffff
    classDef apiLayer fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#ffffff
    classDef serviceLayer fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:#ffffff
    classDef dataLayer fill:#9C27B0,stroke:#7B1FA2,stroke-width:2px,color:#ffffff
    classDef response fill:#00BCD4,stroke:#0097A7,stroke-width:2px,color:#ffffff
    classDef error fill:#F44336,stroke:#C62828,stroke-width:2px,color:#ffffff
    
    class A,B userAction
    class C,D,E apiLayer
    class G,H,J,M serviceLayer
    class K,L dataLayer
    class N,O,P response
    class F,I,Q,R error
```
```
```
```ore Data Flow - Language Exchange App

This diagram shows the simplified data flow for our main user operations.

```mermaid
flowchart TD
    %% User Actions
    A[User Registration Form] --> B[Form Validation]
    B --> C[API Call: POST /api/users/register]
    
    %% API Processing
    C --> D{Middleware Validation}
    D -->|Valid| E[userController.registerUser]
    D -->|Invalid| F[Return Validation Errors]
    
    %% Service Layer Processing
    E --> G[UserService.createUser]
    G --> H{Check User Exists}
    H -->|Exists| I[Throw Error: User Exists]
    H -->|New User| J[Create User Model]
    
    %% Database Operations
    J --> K[Hash Password<br/>Pre-save Hook]
    K --> L[Save to MongoDB]
    L --> M[Generate JWT Token<br/>AuthService]
    
    %% Response Formation
    M --> N[ResponseHelper.authSuccess]
    N --> O[Return User + Token]
    O --> P[Frontend Success Handler]
    
    %% Error Handling
    I --> Q[ResponseHelper.error]
    F --> Q
    Q --> R[Frontend Error Handler]
    
    %% Better styling with high contrast
    classDef userAction fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:#ffffff
    classDef apiLayer fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#ffffff
    classDef serviceLayer fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:#ffffff
    classDef dataLayer fill:#9C27B0,stroke:#7B1FA2,stroke-width:2px,color:#ffffff
    classDef response fill:#00BCD4,stroke:#0097A7,stroke-width:2px,color:#ffffff
    classDef error fill:#F44336,stroke:#C62828,stroke-width:2px,color:#ffffff
    
    class A,B userAction
    class C,D,E apiLayer
    class G,H,J,M serviceLayer
    class K,L dataLayer
    class N,O,P response
    class F,I,Q,R error
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API Gateway
    participant C as Controller
    participant S as Service
    participant D as Database
    participant J as JWT Service

    U->>F: Login Request
    F->>A: POST /api/users/login
    A->>C: Route to Controller
    C->>S: UserService.authenticateUser()
    S->>D: Find user by email
    D-->>S: User data
    S->>S: Compare password hash
    S->>J: Generate JWT token
    J-->>S: Token
    S-->>C: User + Token
    C->>C: ResponseHelper.authSuccess()
    C-->>A: Success Response
    A-->>F: HTTP 200 + User Data
    F-->>U: Login Success
```

## Error Handling Pattern

```mermaid
graph TD
    A[Request] --> B[Validation Middleware]
    B -->|Fail| C[ValidationError]
    B -->|Pass| D[Controller]
    
    D --> E[Service Layer]
    E -->|Business Logic Error| F[AppError]
    E -->|Database Error| G[MongoDB Error]
    E -->|Success| H[Success Response]
    
    C --> I[ResponseHelper.validationError]
    F --> J[ResponseHelper.error]
    G --> K[Error Handler Middleware]
    K --> J
    
    I --> L[HTTP 400 Response]
    J --> M[HTTP 4xx/5xx Response]
    H --> N[ResponseHelper.success]
    N --> O[HTTP 200 Response]
    
    %% Better styling with high contrast
    classDef error fill:#F44336,stroke:#C62828,stroke-width:2px,color:#ffffff
    classDef success fill:#4CAF50,stroke:#388E3C,stroke-width:2px,color:#ffffff
    classDef process fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:#ffffff
    
    class C,F,G,I,J,K,L,M error
    class H,N,O success
    class A,B,D,E process
```
