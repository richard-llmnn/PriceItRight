# PriceItRight

> Preisgestaltung kann frustrierend sein, aber mit PriceItRight wird es zum Kinderspiel.  
> Verwenden Sie unser Web-Tool, um Ihre Waren mit Leichtigkeit zu kalkulieren und Ihre Gewinne zu steigern.  
> Unterstützt werden Vorwärts-, Rückwärts- und Differenzkalkulation.

[Hier gehts zur Webapp!]() 

<!--- add example image later ![]() -->

## Developer Info
| Command           | Documentation                                                               |
|-------------------|-----------------------------------------------------------------------------|
| npm run dev       | Serve the program in development mode with vite (automatic rebuilding)      |
| npm run preview   | Serve the program in production mode with vite                              |
| npm run format    | Format source files in `src/` directory with prettier                       |
| npm run deploy    | Deploy current version of branch `master` to github pages                   |

### Update Github-Pages:

1. Checkout to branch `master` and pull the latest version
2. Set new version in `package.json` file
3. Run `npm install`
4. Commit and push updated `package.json` and `package.lock` file
5. Run `git tag "[package.json verion here]"` and then `git push --tags`
6. Run `npm run deploy`
