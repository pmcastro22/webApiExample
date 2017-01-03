*** Settings ***
Library	Collections			
Library	RequestsLibrary

*** Testcases ***
add bear
    Create Session	bears	http://localhost:8081/api/bears     debug=3
    &{data}=  Create Dictionary  name=jj
    &{headers}=  Create Dictionary  Content-Type=application/x-www-form-urlencoded
    ${resp}=  Post Request  bears   /  data=${data}  headers=${headers}
    Log    ${resp}
    ${output}=    To Json    ${resp.content}    pretty_print=True
    Log    ${output}
    Should Be Equal As Strings	${resp.status_code}	200
   	

*** Keywords ***