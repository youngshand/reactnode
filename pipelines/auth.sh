# authorise ssh access

echo "MAKING SSH DIRECTORY";
mkdir -p ~/.ssh

echo "POPULATING KNOWN HOSTS";
cat $BITBUCKET_CLONE_DIR/pipelines/pipelines_known_hosts >> ~/.ssh/known_hosts

echo "CREATING PRIVATE SSH KEY";
(umask 077; echo ${SSH_KEY?Auth err: `SSH_KEY` is not set} | base64 --decode -i > ~/.ssh/id_rsa)
