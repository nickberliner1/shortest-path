function GraphChallenge(strArr) {
    
    let numberOfNodes = Number(strArr.splice(0, 1));
    let nodes = strArr.splice(0, numberOfNodes);
    
    let paths = strArr.map(function(x) { 
        return x.split('-'); 
    });
    
    let startNode = nodes[0];
    let endNode = nodes[nodes.length - 1];
    let bestPath = startNode + '-' + endNode;
    
    if ( strArr.indexOf(bestPath) != -1 ) {
        return bestPath;
    };
    
    let allPaths = [];
    findPaths([startNode]);
    
    function findPaths(currentPath) {
        let currentNode = currentPath[currentPath.length - 1];
        if ( currentNode === endNode ) { 
            allPaths.push(currentPath.slice());
            return;
        }
        
        for (let i = 0; i < paths.length; i++) {
            
            
            let currentNode = currentPath[currentPath.length - 1];
            if ( currentNode === endNode ) { 
                allPaths.push(currentPath.slice());
                return;
            }
            
            
            let path = paths.join().replace(/\|/g, "").split(",");
            // Regular Expression to turn "[A | B | 1]" into [AB1]

            if ( currentNode == path[i].charAt(0) || currentNode == path[i].charAt(1) ) {
                let nextNode = (currentNode == path[i].charAt(0)) ? path[i].charAt(1) : path[i].charAt(0);
                
                if ( currentPath.indexOf(nextNode) === -1 ) {
                    currentPath.push(nextNode);
                    findPaths(currentPath.slice());
                    currentPath.pop();
                }
            }
        }
    };
    
    let shortestPathNodes = allPaths.sort(function(a, b) { 
        return ( b.length - a.length ); 
    }).pop();
    
    if ( shortestPathNodes ) {
        return shortestPathNodes.join('-');
    } else {
        return -1;
    }
}

console.log(GraphChallenge(["4","A","B","C","D","A|B|1","B|D|9","B|C|3","C|D|4"]));

