'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type PermissionKey = '1' | '2' | '3' | '4';

type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  permissions: PermissionKey[];
};

const API_ENDPOINT = '/api/users'; // TODO: replace with real endpoint when available.

export default function UserCreateForm() {
  const t = useTranslations('UsersCreatePage.form');

  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      permissions: [],
    },
  });

  const permissionKeys: PermissionKey[] = ['1', '2', '3', '4'];

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setServerSuccess(null);

    const payload = {
      f_name: values.firstName.trim(),
      l_name: values.lastName.trim(),
      user_name: values.username.trim(),
      password: values.password,
      permission: permissionKeys.reduce<Record<PermissionKey, boolean>>(
        (acc, key) => {
          acc[key] = values.permissions.includes(key);
          return acc;
        },
        { '1': false, '2': false, '3': false, '4': false },
      ),
    };

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setServerSuccess(t('feedback.success'));
      reset();
    } catch (error) {
      console.error('Failed to submit user payload', error);
      setServerError(t('feedback.error'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-secondary">
            {t('fields.firstName.label')}
          </label>
          <input
            type="text"
            placeholder={t('fields.firstName.placeholder')}
            {...register('firstName', { required: true })}
            className="mt-2 w-full rounded-lg border border-soft bg-surface px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-strong focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
          />
          {errors.firstName ? (
            <p className="mt-1 text-xs text-rose-300">{t('validation.required')}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-secondary">
            {t('fields.lastName.label')}
          </label>
          <input
            type="text"
            placeholder={t('fields.lastName.placeholder')}
            {...register('lastName', { required: true })}
            className="mt-2 w-full rounded-lg border border-soft bg-surface px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-strong focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
          />
          {errors.lastName ? (
            <p className="mt-1 text-xs text-rose-300">{t('validation.required')}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-secondary">
            {t('fields.username.label')}
          </label>
          <input
            type="text"
            placeholder={t('fields.username.placeholder')}
            {...register('username', { required: true })}
            className="mt-2 w-full rounded-lg border border-soft bg-surface px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-strong focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
          />
          {errors.username ? (
            <p className="mt-1 text-xs text-rose-300">{t('validation.required')}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-secondary">
            {t('fields.password.label')}
          </label>
          <input
            type="password"
            placeholder={t('fields.password.placeholder')}
            autoComplete="new-password"
            {...register('password', { required: true, minLength: 8 })}
            className="mt-2 w-full rounded-lg border border-soft bg-surface px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-strong focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
          />
          {errors.password ? (
            <p className="mt-1 text-xs text-rose-300">
              {errors.password.type === 'minLength'
                ? t('validation.passwordLength')
                : t('validation.required')}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {t('fields.permissions.label')}
        </p>
        <p className="mt-1 text-xs text-muted">{t('fields.permissions.helper')}</p>
        <Controller
          name="permissions"
          control={control}
          rules={{
            validate: (value) => (value?.length ?? 0) > 0 || t('validation.permissionRequired'),
          }}
          render={({ field }) => (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {permissionKeys.map((key) => {
                const isChecked = field.value?.includes(key) ?? false;
                const handleChange = (checked: boolean) => {
                  if (checked) {
                    field.onChange([...(field.value ?? []), key]);
                  } else {
                    field.onChange((field.value ?? []).filter((value) => value !== key));
                  }
                  field.onBlur();
                };

                return (
                  <label
                    key={key}
                    className="flex items-center gap-3 rounded-lg border border-soft bg-surface px-4 py-3 text-sm text-primary transition hover:border-strong hover:text-primary"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-soft bg-surface text-emerald-400 focus:ring-emerald-400/60"
                      checked={isChecked}
                      onChange={(event) => handleChange(event.target.checked)}
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">
                        {t(`fields.permissions.options.${key}.title`)}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {t(`fields.permissions.options.${key}.description`)}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        />

        {errors.permissions ? (
          <p className="mt-2 text-xs text-rose-300">
            {typeof errors.permissions?.message === 'string'
              ? errors.permissions.message
              : t('validation.permissionRequired')}
          </p>
        ) : null}
      </div>

      {/* <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-secondary">
            {t('fields.role.label')}
          </label>
          <select
            {...register('role', { required: true })}
            className="mt-2 w-full rounded-lg border border-soft bg-surface px-4 py-2 text-sm text-primary focus:border-strong focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
          >
            <option value="admin">{tUsers('roles.admin')}</option>
            <option value="operator">{tUsers('roles.operator')}</option>
            <option value="viewer">{tUsers('roles.viewer')}</option>
          </select>
        </div>
      </div> */}

      {/* <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-secondary">
            {t('fields.status.label')}
          </label>
          <select
            {...register('status', { required: true })}
            className="mt-2 w-full rounded-lg border border-soft bg-surface px-4 py-2 text-sm text-primary focus:border-strong focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
          >
            <option value="online">{tUsers('status.online')}</option>
            <option value="idle">{tUsers('status.idle')}</option>
            <option value="offline">{tUsers('status.offline')}</option>
          </select>
        </div> */}

      {/* <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-secondary">
              {t('fields.lastActive.count.label')}
            </label>
            <input
              type="number"
              min={0}
              step={1}
              {...register('lastActiveCount', {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
              className="mt-2 w-full rounded-lg border border-soft bg-surface px-4 py-2 text-sm text-primary focus:border-strong focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
            />
            {errors.lastActiveCount ? (
              <p className="mt-1 text-xs text-rose-300">{t('validation.nonNegative')}</p>
            ) : null}
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-secondary">
              {t('fields.lastActive.unit.label')}
            </label>
            <select
              {...register('lastActiveUnit', { required: true })}
              className="mt-2 w-full rounded-lg border border-soft bg-surface px-4 py-2 text-sm text-primary focus:border-strong focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
            >
              <option value="minutes">{t('fields.lastActive.unit.options.minutes')}</option>
              <option value="hours">{t('fields.lastActive.unit.options.hours')}</option>
            </select>
          </div>
        </div> */}

      {/* <p className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-xs text-indigo-100">
        {t('helper.apiUnavailable')}
      </p> */}

      {serverSuccess ? (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          {serverSuccess}
        </div>
      ) : null}

      {serverError ? (
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {serverError}
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/users"
          className="inline-flex items-center justify-center rounded-lg border border-soft bg-surface px-4 py-2 text-sm font-semibold text-secondary transition hover:border-strong hover:text-primary focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:ring-offset-2 focus:ring-offset-app"
        >
          {t('actions.cancel')}
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg btn-tonal-success px-6 py-2 text-sm font-semibold uppercase tracking-wide transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-app disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? t('actions.submitting') : t('actions.submit')}
        </button>
      </div>
    </form>
  );
}
