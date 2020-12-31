import { useRef } from "react"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { ViewIcon } from "@chakra-ui/icons"

const BatchReviewDrawer = (props) => {

  const { data, submitHandler } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const handleSubmit = (corrections, close) => {
    console.log("Submitting corrections for batch", corrections.batch_id)
    submitHandler(corrections)
    close()
  }

  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<ViewIcon />} 
        colorScheme="blue" 
        ml={20}
        size="sm"
        mr={3}
        onClick={onOpen}
      >
        Review
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Review batch</DrawerHeader>

            <DrawerBody>
              Placeholder text
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue" onClick={(data) => handleSubmit(data, onClose)}>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default BatchReviewDrawer
