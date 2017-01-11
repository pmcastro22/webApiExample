#!groovy

/*
The MIT License

Copyright (c) 2015-, CloudBees, Inc., and a number of other of contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

node('master') {


    currentBuild.result = "SUCCESS"

    try {

       stage 'Checkout'

            checkout scm
       
       stage 'Install'

            env.NODE_ENV = "test"

            print "Environment will be : ${env.NODE_ENV}"
            
            bat 'node -v'
            bat 'npm prune'
            bat 'npm install'
            bat 'forever start server.js'

       stage 'Tests'
            bat '"C:\\Program Files (x86)\\SmartBear\\SoapUI-5.3.0\\bin\\testrunner.bat" -j tests\\soapui.xml'
       stage 'Cleanup'

            echo 'prune and cleanup'
            bat 'forever stop server.js'
            bat 'npm prune'
            bat 'rd node_modules /s /q'

            

        }


    catch (err) {

        currentBuild.result = "FAILURE"

            

        throw err
    }

}
