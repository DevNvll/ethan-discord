const NowClient = require("now-client");

const now = new NowClient();

console.log("> Running deployment script");
now
  .getDeployments()
  .then(deployments => {
    console.log("> Removing active deployments");
    const active = deployments.filter(
      deploy =>
        deploy.name === require("../package.json").name &&
        deploy.scale.current >= 1
    );
    if (active.length >= 1)
      active.forEach(deploy =>
        now
          .deleteDeployment(deploy.uid)
          .then(removed => console.log("> Removed deployment %s", deploy.url))
      );
    else console.log("> No active instances found. Deploying...");
  })
  .catch(err => {
    console.log(err);
  });
