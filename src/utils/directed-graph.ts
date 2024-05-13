type WithId<T> = T & {
  id: string;
};

interface GraphNodeArgs<T> {
  id: string;
  value: T;
  targets?: GraphNode<T>[];
  sources?: GraphNode<T>[];
}

function findNode<T>(list: GraphNode<T>[], nodeId: string) {
  return list.find(item => item.id === nodeId);
}

function filterOutNode<T>(list: GraphNode<T>[], nodeId: string) {
  return list.filter(item => item.id !== nodeId);
}

export class GraphNode<T> {
  id: string;
  value: T;
  targets: GraphNode<T>[];
  sources: GraphNode<T>[];
  constructor({ id, value, targets = [], sources = [] }: GraphNodeArgs<T>) {
    this.id = id;
    this.value = value;
    this.targets = targets;
    this.sources = sources;
  }

  addConnection(node: GraphNode<T>, key: "targets" | "sources") {
    if (!findNode(this[key], node.id)) {
      this[key].push(node);
    }
  }

  removeConnectionWith(nodeId: string) {
    this.targets = filterOutNode(this.targets, nodeId);
    this.sources = filterOutNode(this.sources, nodeId);
  }
}

export class DirectedGraph<T> {
  nodes: GraphNode<T>[];
  groupsCache: WithId<T>[][] | null;

  constructor() {
    this.nodes = [];
    this.groupsCache = null;
  }

  addNode(node: WithId<T>) {
    if (!findNode(this.nodes, node.id)) {
      const result = new GraphNode({ id: node.id, value: node });

      this.nodes.push(result);
      this.groupsCache = null;
    }
  }

  addConnection(sourceNodeId: string, targetNodeId: string) {
    const source: GraphNode<T> | undefined = findNode(this.nodes, sourceNodeId);
    const target: GraphNode<T> | undefined = findNode(this.nodes, targetNodeId);

    if (source && target) {
      source.addConnection(target, "targets");
      target.addConnection(source, "sources");
      this.groupsCache = null;
    }
  }

  removeConnection(sourceNodeId: string, targetNodeId: string) {
    const source: GraphNode<T> | undefined = findNode(this.nodes, sourceNodeId);
    const target: GraphNode<T> | undefined = findNode(this.nodes, targetNodeId);

    if (source && target) {
      source.removeConnectionWith(target.id);
      target.removeConnectionWith(source.id);
      this.groupsCache = null;
    }
  }

  removeNode(nodeId: string) {
    const deleteMe = findNode(this.nodes, nodeId);

    if (deleteMe) {
      deleteMe.targets.forEach(tr => {
        const target = findNode(this.nodes, tr.id);

        if (target) {
          target.removeConnectionWith(nodeId);
        }
      });

      this.nodes = this.nodes.map(item => {
        item.targets = filterOutNode(item.targets, nodeId);
        item.sources = filterOutNode(item.sources, nodeId);

        return item;
      });

      this.nodes = filterOutNode(this.nodes, nodeId);
      this.groupsCache = null;
      const groups: WithId<T>[][] = this.findGroups();

      // delete all of the nodes which does not have any connections
      groups.forEach((group: WithId<T>[]) => {
        if (group.length === 1) {
          this.removeNode(group[0].id);
        }
      });
    }
  }

  findGroups(): WithId<T>[][] {
    if (this.groupsCache) return this.groupsCache;

    const visited = new Set<string>();
    let groups: WithId<T>[][] = [];

    this.nodes.forEach(nd => {
      if (!visited.has(nd.id)) {
        // it should go through all of the sources and targets and mark them as visited
        let group: WithId<T>[] = [];

        this.search(nd, visited, group);
        groups.push(group);
      }
    });

    this.groupsCache = groups;

    return groups;
  }

  search(node: GraphNode<T>, visited: Set<string>, group: T[]) {
    visited.add(node.id);
    group.push(node.value);
    node.sources.forEach(target => {
      if (!visited.has(target.id)) {
        this.search(target, visited, group);
      }
    });
    node.targets.forEach(target => {
      if (!visited.has(target.id)) {
        this.search(target, visited, group);
      }
    });
  }
}
