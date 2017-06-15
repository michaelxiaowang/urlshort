# urlshort
Takes a user given url and stores it in the database. It uses the auto-incremented row id and converts it to base 36, 
storing that as the related shortened url.
The site will then give users their new url, which is urlshort.com/[somevalue]. 
When user visits urlshort.com (or whatever process.env.HOSTNAME in app.js is), they are redirected to the original site.
