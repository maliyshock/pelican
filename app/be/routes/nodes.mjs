import express from "express";
import {ObjectId} from "mongodb";
import db, {client} from "../db/index.mjs";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
  let collection = await db.collection("nodes");
  let results = await collection.find({})
    .toArray();

  res.send(results).status(200);
});

router.get("/remove prop", async (req, res) => {

})

router.get("/replace-roles", async (req, res) => {
  try {
    const nodesDb = await client.db('nodes');
    const constantsDb = await client.db('constants');
    const rolesCollection = await constantsDb.collection('roles');

    // Retrieve all roles from the constants -> roles collection
    const roles = await rolesCollection.find().toArray();
    const roleMap = roles.reduce((map, role) => {
      map[role.value] = role._id;
      return map;
    }, {});

    // List all collections in the nodes database
    const collections = await nodesDb.listCollections().toArray();

    // Array to hold nodes with roles that couldn't be replaced
    const nodesWithUnmatchedRoles = [];

    // Iterate over each collection
    for (const collectionInfo of collections) {
      const collection = nodesDb.collection(collectionInfo.name);

      // Retrieve all nodes
      const nodes = await collection.find().toArray();

      // Iterate over each node and update the roles
      for (const node of nodes) {
        if (node.roles) {
          const updatedRoles = node.roles.map(role => roleMap[role.toLowerCase()] || null);
          const allRolesMatched = updatedRoles.every(role => role !== null);

          if (allRolesMatched) {
            // Update the node with the new roles
            await collection.updateOne({ _id: node._id }, { $set: { roles: updatedRoles } });
          } else {
            // Log nodes with roles that couldn't be matched
            nodesWithUnmatchedRoles.push({
              nodeId: node._id,
              originalRoles: node.roles,
              unmatchedRoles: node.roles.filter(role => !roleMap[role.toLowerCase()])
            });
          }
        }
      }
    }

    if (nodesWithUnmatchedRoles.length > 0) {
      console.log('Nodes with unmatched roles:', nodesWithUnmatchedRoles);
    } else {
      console.log('All roles were successfully replaced.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
});

// Get a list of 50 posts
router.get("/roles-creation", async (req, res) => {
  try {
    const nodesDb = await client.db('nodes');
    const constantsDb = await client.db('constants');
    const rolesCollection = await constantsDb.collection('roles');

    // List all collections in the nodes database
    const collections = await nodesDb.listCollections().toArray();

    // Set to store unique roles
    const uniqueRoles = new Set();

    // Iterate over each collection
    for (const collectionInfo of collections) {
      const collection = nodesDb.collection(collectionInfo.name);
      const nodes = await collection.find().toArray();

      // Extract unique roles
      nodes.forEach(node => {
        if (node.roles) {
          node.roles.forEach(role => uniqueRoles.add(role.toLowerCase()));
        }
      });
    }

    // Prepare role documents
    const roleDocuments = Array.from(uniqueRoles).map(role => ({
      _id: new ObjectId(),
      value: role
    }));

    // Insert unique roles into the roles collection if there are any roles to insert
    if (roleDocuments.length > 0) {
      await rolesCollection.insertMany(roleDocuments);
      console.log(`Inserted ${roleDocuments.length} unique roles into the 'roles' collection in the 'constants' database.`);
    } else {
      console.log('No roles to insert.');
    }
  } catch(e) {
    console.error('Error:', e);
  } finally {
    await client.close();
  }
});

export default router
