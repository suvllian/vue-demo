<template>
    <div>
        <Album></Album>
        <Hot></Hot>
        <Teacher></Teacher>
        <ClassSet></ClassSet>
        <Person></Person>
        <JoinTitle></JoinTitle>
        <Join></Join>
    </div>
</template>

<script>
import Album from './album'
import Hot from './hotclass'
import Teacher from './teacher'
import ClassSet from './class'
import Person from './person'
import Join from './join'
import JoinTitle from './jointitle'
import MaskBox from './mask'

export default {
  components: {
    Album, Hot, Teacher, ClassSet, Person, Join, JoinTitle, MaskBox
  }
}
</script>