# Development Branch Changes

## JIRA
### 775 -- Remove valetLevelDateOrderd from Vehicle.yaml*
### 778 -- Add Policy.policyInterests[] --> $ref: ../Interests.yaml*
### 794 -- Changed Vehicle.valetLevel to required; string or nullable.*
### 780 -- Deprecate Policy.billingPlan, comment out all but paymentMode on Billing. (outstanding question)
### 777 -- Change Policy.policyTerm to type:['number', 'null']*
### 773 -- Updated files for required/null
### 793 -- Add model SupplementalDocument and Policy.supplementalDocuments[]-->SupplementalDocument*
### 802 -- Add exception handling for 401, 404 and 500.*
### 803 -- Added Acknowledgement model.*
### 774 -- Refactor PolicyDetail-Personal*
### 809 -- feature/809-unify-policy-assciations
### 808 -- Rename CoverageDetail-Life.type to coverageType; add PolicyDetail-Life.type
### 824 -- Add Demographics$ to PolicyAssociation
### EWS 464 -- Add exposures (Hash) to Dwelling
## Other
* Removed `PolicyDetail-Live.policyAssociations[] --> PolicyAssociation` as it was added in error.
* Removed `paramters: coverageId` definition from policies.yaml -- not used
* Updated memberships.yaml, clients.yaml and client-acounts.yaml to use global parameter definitions as is
the case in policies.yaml
* Added lineOfBusiness back into Policy as enum