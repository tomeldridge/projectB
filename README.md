# projectB

To set up and run the site/app


First you will need to setup a proper server environment.

A. We used an Amazon AWS/EC2 instance running Ubuntu 16.04 server.
B. The server that you set up will need ports 80 and 22 open for internet traffic, these are 
   the ports that the app expects. Port 22 will be used for setup of the app through ssh 
   and port 80 will be for users accessing the app from the web.
C. If you wish to deploy the app on Amazon please refer to their guides to setup a server
	       http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html
D. If you wish to deploy locally you will need to setup port forwarding at your current ip		     
   and have a version of Ubuntu or another linux distro installed locally. 
E. For info on port forwarding please refer to the instructions given by your router’s
   manufacturer.
F. To setup Ubuntu server please refer to Ubuntu’s online documentation
           https://www.ubuntu.com/download/server/install-ubuntu-server   
  

Next you will need to transfer all source code files within the folder ‘projectB’ to the home directory of the new server.

A. You can do this over ssh with the ‘scp’ command, such as ‘scp -r projectB [address to new server]’.


Next you will need to install Node.js and Node package manager from the home directory.

A. Run ‘sudo apt install node.js’ to install node
B. Run ‘sudo apt install npm’ to install node package manager


Next you will need to install the dependencies using node package manager. There is a file named ‘package.json’ that will automatically install all needed middleware.

A. Run ‘npm install’ from within the projectB directory that you transferred to the server.


Next you will need to start the app.

A. Run ‘sudo node app.js’ and the app will now be running and accessible from the web


Now the app is live and you will need to use the public address of the server if it’s an Amazon instance or your routers external ip address to connect to the app via a web browser. 



This application is currently hosted on Amazon at the following address
http://ec2-35-164-210-244.us-west-2.compute.amazonaws.com/ 
     
If you have troubles connecting please contact the site administrator, Adam Sunderman at sunderad@oregonstate.edu for immediate troubleshooting and access help.


