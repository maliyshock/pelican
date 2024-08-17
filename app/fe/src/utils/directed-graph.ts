type WithId<T> = T & {
  id: string;
};

interface GraphNodeArgs<T> {
  id: string;
  value: T;
  targets?: GraphNode<T>[];
  sources?: GraphNode<T>[];
}

export interface IndexMap {
  [key: string]: number;
}

export type Nodes<T> = Map<string, GraphNode<T>>;

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
  constructor({ id, value, targets, sources }: GraphNodeArgs<T>) {
    this.id = id;
    this.value = value;
    this.targets = targets || [];
    this.sources = sources || [];
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

  update(updates: Partial<GraphNodeArgs<T>>) {
    if (updates.value !== undefined) this.value = updates.value;
    if (updates.targets !== undefined) this.targets = updates.targets;
    if (updates.sources !== undefined) this.sources = updates.sources;
  }
}

export class DirectedGraph<T> {
  nodes: Nodes<T>;
  entrancePoints: IndexMap;

  constructor() {
    this.nodes = new Map<string, GraphNode<T>>();
    this.entrancePoints = {};
  }

  addNode(node: WithId<T>) {
    if (!this.nodes.has(node.id)) {
      this.nodes.set(node.id, new GraphNode({ id: node.id, value: node }));
    }
  }

  addConnection(sourceNodeId: string, targetNodeId: string) {
    const source: GraphNode<T> | undefined = this.nodes.get(sourceNodeId);
    const target: GraphNode<T> | undefined = this.nodes.get(targetNodeId);

    if (source && target) {
      source.addConnection(target, "targets");
      target.addConnection(source, "sources");
    }
  }

  removeConnection(sourceNodeId: string, targetNodeId: string) {
    const source: GraphNode<T> | undefined = this.nodes.get(sourceNodeId);
    const target: GraphNode<T> | undefined = this.nodes.get(targetNodeId);

    if (source && target) {
      source.removeConnectionWith(target.id);
      target.removeConnectionWith(source.id);
    }

    this._cleanItself();
  }

  _cleanItself() {
    const { groups } = this.getGroups();

    // delete all of the nodes which does not have any connections
    groups.forEach((group: WithId<T>[]) => {
      if (group.length === 1) {
        this.removeNode(group[0].id);
      }
    });
  }

  removeNode(nodeId: string) {
    const deleteMe = this.nodes.get(nodeId);

    if (deleteMe) {
      deleteMe.targets.forEach(tr => {
        const target = this.nodes.get(tr.id);

        if (target) {
          target.removeConnectionWith(nodeId);
        }
      });

      this.nodes.forEach(item => {
        item.update({
          targets: filterOutNode(item.targets, nodeId),
          sources: filterOutNode(item.sources, nodeId),
        });
      });

      this.nodes.delete(nodeId);
      this._cleanItself();
    }
  }

  getGroups() {
    const visited = new Set<string>();
    let groups: WithId<T>[][] = [];
    let nodesMap: IndexMap = {};

    this.entrancePoints = {};
    this.nodes.forEach(nd => {
      if (!visited.has(nd.id)) {
        const currentGroupIndex = 0;
        // it should go through all of the sources and targets and mark them as visited
        let group: WithId<T>[] = [];

        this.search(nd, visited, group, currentGroupIndex, nodesMap);
        groups.push(group);
      }
    });

    return { groups, nodesMap };
  }

  getResult() {
    const { groups, nodesMap } = this.getGroups();

    return { groups, nodesMap, entrancePoints: this.entrancePoints };
  }

  search(node: GraphNode<T>, visited: Set<string>, group: T[], index: number, nodesMap: { [key: string]: number }, isPush = true) {
    visited.add(node.id);
    if (isPush) {
      group.push(node.value);
    } else {
      group.unshift(node.value);
    }

    nodesMap[node.id] = index;

    if (node.sources.length === 0 && this.entrancePoints[node.id] === undefined) {
      this.entrancePoints[node.id] = index;
    }

    node.sources.forEach(target => {
      if (!visited.has(target.id)) {
        this.search(target, visited, group, index, nodesMap, false);
      }
    });

    node.targets.forEach(target => {
      if (!visited.has(target.id)) {
        this.search(target, visited, group, index, nodesMap);
      }
    });
  }
}
