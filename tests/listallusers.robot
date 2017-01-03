*** Settings ***
Library	Collections			
Library	RequestsLibrary

*** Testcases ***
list all users	
    Create Session	bears	http://localhost:8081/api/bears	
    ${resp}=	Get Request	bears	/
    Should Be Equal As Strings	${resp.status_code}	200	
   	

*** Keywords ***