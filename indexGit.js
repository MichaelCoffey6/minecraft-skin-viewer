import { simpleGit, CleanOptions } from 'simple-git';

//simpleGit().clean(CleanOptions.FORCE);

const options = {
   baseDir: process.cwd(),
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

// when setting all options in a single object
const git = simpleGit(options);
//await git.init().addRemote('origin', 'https://github.com/MichaelCoffey6/minecraft-skin-viewer.git').catch(e => null);
git.add(['./'], () => {
  git.commit("testing npm simple-git", () => {
    git.push()
  })
})