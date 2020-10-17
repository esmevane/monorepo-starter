import { useRef, useEffect, useState } from "react"
import {
  Interpreter,
  StateMachine,
  interpret,
  StateValue,
  StateValueMap,
} from "xstate"

const RetryInMilliseconds = 16

export const isValueMap = (
  stringOrValueMap: StateValue,
): stringOrValueMap is StateValueMap => typeof stringOrValueMap !== "string"

// These two helper methods establish some safety checks surrounding
// keeping and using React mutable refs to Xstate services.
//
export function useServiceRef<
  Context = any,
  Schema = any,
  Events extends { type: string } = any
>(service: Interpreter<Context, Schema, Events>) {
  type Service = typeof service
  type Send = Service["send"]
  type SendCallback = (send: Send) => void
  type ServiceCallback = (service: Service) => void

  const ref = useRef(service)
  const insideService = (callback: ServiceCallback) =>
    ref.current && callback(ref.current as Service)

  // The set timeout here should be safe because the hook will dereference
  // the underlying service, however, if there does happen to be some kind
  // of perpetual loop happening here, the right move could be to add a
  // reference that tracks whether or not the hook is mounted. If the hook
  // is NOT mounted, we will simply not create any more timeouts.
  //
  const serviceEvent = (callback: SendCallback) => {
    const wrappedSend: typeof ref.current.send = (event, payload) => {
      return ref.current.send(event, payload)
    }

    ref.current.initialized
      ? callback(wrappedSend)
      : setTimeout(() => serviceEvent(callback), RetryInMilliseconds)
  }

  useEffect(() => {
    service.start()

    return () => {
      service.stop()
    }
    // eslint-disable-next-line
  }, [])

  const payload = {
    ref,
    insideService,
    serviceEvent,
  }

  return payload as typeof payload
}

export function useServiceState<
  Context = any,
  Schema = any,
  Events extends { type: string } = any
>(machine: StateMachine<Context, Schema, Events>) {
  const [state, setState] = useState(machine.initialState)
  const serviceTools = useServiceRef<Context, Schema, Events>(
    interpret(machine),
  )

  useEffect(() => {
    serviceTools.insideService((service) => {
      service.onTransition((nextState) => {
        if (nextState.changed) {
          setState(nextState)
        }
      })
    })
    // eslint-disable-next-line
  }, [])

  return [state, serviceTools] as [typeof state, typeof serviceTools]
}
