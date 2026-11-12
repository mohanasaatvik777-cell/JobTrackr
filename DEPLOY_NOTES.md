# Error explanation
Error message                               where I found it             Fix
A wrong MONGODB_URI on Render        Render, your service, Logs    In the mongodb website, copied the connection string from the there added in 
                                                                   in the vs code and commit and push and then redeploy in the render.

A CLIENT_URL that doesn’t match      Browser Console(press F12)   • Match CLIENT_URL in the backend settings to the Vercel address exactly, 
your Vercel address                                                 with  no trailing slash. This works because the API uses CLIENT_URL. 


A missing VITE_API_URL on Vercel    Browser Network (Tab)          To fix a missing VITE_API_URL on Vercel, add the variable under Project       
(redeploy after removing it)                                        Settings > Environment Variables, click Save, and then click Redeploy from
                                                                     your deployment's option menu             
        
                  
