import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { add } from "../generated/Emitter/Emitter"

export function createaddEvent(
  from: Address,
  reciever: Address,
  amount: BigInt
): add {
  let addEvent = changetype<add>(newMockEvent())

  addEvent.parameters = new Array()

  addEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  addEvent.parameters.push(
    new ethereum.EventParam("reciever", ethereum.Value.fromAddress(reciever))
  )
  addEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return addEvent
}
