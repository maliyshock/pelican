type WithId<T> = T & {
  id: string;
};

interface GraphNodeArgs<T> {
  id: string;
  value: T;
  targets?: GraphNode<T>[];
  sources?: GraphNode<T>[];
}

export interface EntrancePoints {
  [key: string]: number;
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
  nodes: GraphNode<WithId<T>>[];
  entrancePoints: EntrancePoints;

  constructor() {
    this.nodes = [];
    this.entrancePoints = {};
  }

  addNode(node: WithId<T>) {
    if (!findNode(this.nodes, node.id)) {
      const result = new GraphNode({ id: node.id, value: node });

      this.nodes.push(result);
    }
  }

  addConnection(sourceNodeId: string, targetNodeId: string) {
    const source: GraphNode<T> | undefined = findNode(this.nodes, sourceNodeId);
    const target: GraphNode<T> | undefined = findNode(this.nodes, targetNodeId);

    if (source && target) {
      source.addConnection(target, "targets");
      target.addConnection(source, "sources");
    }
  }

  removeConnection(sourceNodeId: string, targetNodeId: string) {
    const source: GraphNode<T> | undefined = findNode(this.nodes, sourceNodeId);
    const target: GraphNode<T> | undefined = findNode(this.nodes, targetNodeId);

    if (source && target) {
      source.removeConnectionWith(target.id);
      target.removeConnectionWith(source.id);
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
      const groups = this.findGroups();

      // delete all of the nodes which does not have any connections
      groups.forEach((group: WithId<T>[]) => {
        if (group.length === 1) {
          this.removeNode(group[0].id);
        }
      });
    }
  }

  findGroups(): WithId<T>[][] {
    const visited = new Set<string>();
    let groups: WithId<T>[][] = [];

    this.entrancePoints = {};
    this.nodes.forEach(nd => {
      if (!visited.has(nd.id)) {
        const currentGroupIndex = 0;
        // it should go through all of the sources and targets and mark them as visited
        let group: WithId<T>[] = [];

        this.search(nd, visited, group, currentGroupIndex);
        groups.push(group);
      }
    });

    return groups;
  }

  getResult() {
    const groups = this.findGroups();

    return { groups, entrancePoints: this.entrancePoints };
  }

  search(node: GraphNode<T>, visited: Set<string>, group: T[], index: number, isPush = true) {
    visited.add(node.id);
    isPush ? group.push(node.value) : group.unshift(node.value);

    if (node.sources.length === 0 && this.entrancePoints[node.id] === undefined) {
      this.entrancePoints[node.id] = index;
    }

    node.sources.forEach(target => {
      if (!visited.has(target.id)) {
        this.search(target, visited, group, index, false);
      }
    });

    node.targets.forEach(target => {
      if (!visited.has(target.id)) {
        this.search(target, visited, group, index);
      }
    });
  }
}
