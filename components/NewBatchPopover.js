import { AddIcon } from "@chakra-ui/icons"
import {
  Text,
  Portal,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Select
} from "@chakra-ui/react"

const NewBatchPopover = (props) => {
  const options = {
    batchSize: 5 // default
  }

  const handleSubmit = (size, close) => {
    props.submitHandler(size)
    close()
  }

  return (
    <Popover isLazy placement="left" gutter={30}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button 
              leftIcon={<AddIcon />} 
              colorScheme="blue" 
              ml={20}
            >
              New Batch
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Submit New Batch</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Select 
                  placeholder="Batch size" 
                  mb={3} 
                  onChange={(event) => { options.batchSize = event.target.value; console.log("Selected", event.target.value)}}
                  defaultValue="5"
                >
                  <option value="5">5 records</option>
                  <option value="10">10 records</option>
                  <option value="15">15 records</option>
                </Select>
                <Button
                  colorScheme="blue"
                  onClick={(size, close) => handleSubmit(options.batchSize, onClose)}
                >Submit Batch</Button>
              </PopoverBody>
              <PopoverFooter>Select number of records and "Submit"</PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}

export default NewBatchPopover
