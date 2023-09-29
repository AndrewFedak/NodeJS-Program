Code base of **Domain** and **Application Service** layer is same as in HT_6

Changes only been done in **Persistence** (underlying DB) and **Infrustructure** (repository implementation) layers. 

**Application** (which consumes Repository interface  as explicit contract for persisting data, that is defined in Domain Layer, thus App Service -> Domain) 
and **Domain** (that manages *Aggregates*, *Entities*, etc, thus delivers business value) layers were left unchanged 

It proves that encapsulatino, separation of concerns, single reponsibility and other Clean Code/Architecture principles
will leave codebase maintainable (readable, testable, modifiable) through development.

By applying **Layer architecture** and following rule to: not have circular dependencies (Clean Architecture, Uncle Bob) and depend-to-Domain, 
as HT_6 + HT_7 showed that will help as to not be scared of upper level changes thus, at the end, those changes won't affect any Domain functionality if (Layers boundaries are not violated)

Also, explicit contracts as interfaces and ubiquitous language of domain terms across codebase, will allow our application to behave same, be undesrandable to everyone the same and provide same business functional requirements after any upper level change, thus being not affected by some upper layer change plans or concers, that will help us to be more flexible and confident in our code stability and execution correctness after any minor or major upper layer change.

> But we need to keep in mind, and also by my personal experience with that task, following such Domain Model Pattern could be big time consuming task, so we have to define
> parts of applciation that really will make use of ready-to-extend, flexible, readable and testable code in a future. 
> Functional components in **"core subdomains"** of application, that really will provide value to business should be developed in that way. 

Some **"generic"** or **"supportive"** subdomains may be developed in a **"transaction script"** or **"anemic model"** patterns to provide value in-place 

![Clear Architecture!](https://codeopinion.com/wp-content/uploads/2023/02/image-1.png "San Juan Mountains")

Presentation -> Infrustructure/Application Service -> Domain