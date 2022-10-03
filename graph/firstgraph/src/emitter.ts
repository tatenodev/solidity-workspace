// mapping.ts
// https://ethereum.org/ja/developers/tutorials/the-graph-fixing-web3-data-querying/#:~:text=%E3%81%99%E3%81%B9%E3%81%A6%E8%A1%A8%E7%A4%BA-,Mapping%20(mapping.ts),-The%20mapping%20file

import { BigInt } from "@graphprotocol/graph-ts";
import { Emitter, add } from "../generated/Emitter/Emitter";
import { ExampleEmitter } from "../generated/schema";

export function handleadd(event: add): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // event.transaction.from.toHex() だけだとidが一意でなくなる可能性がある?’
  let entity = ExampleEmitter.load(
    event.transaction.from.toHex() + "-" + event.logIndex.toString()
  );

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEmitter(
      event.transaction.from.toHex() + "-" + event.logIndex.toString()
    );

    // Entity fields can be set using simple assignments
    entity.amount = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  // entity.amount = entity.amount + BigInt.fromI32(1)
  entity.amount = event.params.amount;

  // Entity fields can be set based on event parameters
  entity.from = event.params.from;
  entity.reciever = event.params.reciever;
  entity.blockhash = event.block.hash;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // None
}
