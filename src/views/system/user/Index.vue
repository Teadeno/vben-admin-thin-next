<template>
  <div>
    <PageWrapper contentBackground contentFullHeight dense fixedHeight>
      <Grid ref="grid" :table-config="getTableConfig()" :api="getList">
        <template #toolbar_buttons>
          <div>
            <a-button type="primary" @click="addModel(true, {})">新增</a-button>
          </div>
        </template>
        <template #operate="{ row }">
          <vxe-button icon="fa fa-edit" title="编辑" circle @click="editModel(true, row)" />
          <vxe-button
            circle
            icon="fa fa-trash"
            title="删除"
            @click="sendConfirmPost([del, { ids: row.id }], [grid.table.commitProxy, 'query'])"
          />
        </template>
      </Grid>
    </PageWrapper>
    <FormModal
      @register="registerAdd"
      title="新增"
      :schemas="getAddFrom()"
      :ok-api="save"
      @handle-ok-success="grid.table.commitProxy('query')"
    />
    <FormModal
      @register="registerEdit"
      title="编辑"
      :schemas="getEditFrom()"
      :ok-api="save"
      @handle-ok-success="grid.table.commitProxy('query')"
    />
  </div>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import Grid from '/@/common/Grid.vue';
  import { sendConfirmPost } from '/@/common/utils';
  import { ref } from 'vue';
  import { getList, save, del } from '/@/api/system/user';
  import { useModal } from '/@/components/Modal';
  import { getTableConfig, getAddFrom, getEditFrom } from '/@/views/system/user/data';
  import FormModal from '/@/common/FormModal.vue';

  const [registerAdd, { openModal: addModel }] = useModal();
  const [registerEdit, { openModal: editModel }] = useModal();

  const grid = ref({});
</script>
