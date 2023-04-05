const { HasNotCommitted } = require('../data/data_helper');
const PostChannelMessage = (HasPostedCommit) => {
    var committed = HasNotCommitted();
    if (!HasPostedCommit) {



        client.channels.fetch("729310559471796227").then(x => x.send(committed[1]));
        if (committed[0]) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (!committed[0]) {
            client.channels.fetch("729310559471796227").then(x => x.send(committed[1]));
            return false;
        }
    }
}

module.exports = {
    PostChannelMessage
} 