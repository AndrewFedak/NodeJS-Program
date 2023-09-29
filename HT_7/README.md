Code base of Domain and Application Service layer is same as in HT_6

Changes only been done in Persistence (underlying DB) and Infrustructure (repository implementation) layers. 

Application (which consumes Repository interface  as explicit contract for persisting data, that is defined in Domain Layer, thus App Service -> Domain) 
and Domain (that manages Aggregates, Entities, etc, thus delivers business value) layers were left unchanged 

It proves that encapsulatino, separation of concerns, single reponsibility and other Clean Code/Architecture principles
will leave codebase maintainable (readable, testable, modifiable) through development.

By applying Layer architecture and following rule to not have circular dependencies and depend only on Domain, as in HT_6 + HT_7 showed,
will help as to not be scared of upper level changes thus, at the end, those changes won't affect any Domain functionality if Layers boundaries are not crossed

Also, explicit contracts as interfaces and ubiquitous language of terms across codebase, will allow our application to behave same and provide same business functional requirements, neglecting some upper layer changes and concers, thus we will be more flexible

Infrustructure -> Application Service -> Domain